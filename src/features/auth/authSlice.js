import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../app/api/config/firebase';
import { close_Modal } from '../../app/common/Modals/Modal_Slice';
const db = firebase.firestore();

export const user_sign_in_with_email_and_password = createAsyncThunk(
	'auth/signInWithEmailAndPassword',
	async ({ values }, { rejectWithValue, dispatch }) => {
		try {
			const { email, password } = values;
			const response = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			dispatch(close_Modal());
			return response.user;
		} catch (error) {
			return rejectWithValue('problem with email or password');
		}
	},
);

const setUserProfileData = (user) => {
	return db
		.collection('user')
		.doc(user.uid)
		.set({
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL || null,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
};
export const user_sign_up_with_email_and_password = createAsyncThunk(
	'auth/signUpWithEmailAndPassword',
	async ({ values }, { rejectWithValue, dispatch }) => {
		try {
			const { email, password, name } = values;
			const response = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password);
			dispatch(close_Modal());
			await response.user.updateProfile({
				displayName: name,
			});
			return await setUserProfileData(response.user);
		} catch (error) {
			return rejectWithValue('problem with email or password');
		}
	},
);
export const user_signOut_firebase = createAsyncThunk(
	'auth/signOut',
	async (_, { dispatch }) => {
		const response = await firebase.auth().signOut();
		dispatch(user_sign_out());
		return response;
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authenticated: false,
		current_user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		user_sign_in: (state, action) => {
			state.authenticated = true;
			const { email, uid, photoURL, displayName } = action.payload;
			state.current_user = { email, uid, photoURL, displayName };
		},
		user_sign_out: (state, action) => {
			state.authenticated = false;
			state.current_user = null;
		},
	},
	extraReducers: {
		//user sign in reducer
		[user_sign_in_with_email_and_password.pending]: (state, action) => {
			state.status = 'pending';
		},
		[user_sign_in_with_email_and_password.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.authenticated = true;
			const { email, uid, photoURL, displayName } = action.payload;
			state.current_user = {
				email,
				displayName,
				uid,
				photoURL,
			};
			state.error = null;
		},
		[user_sign_in_with_email_and_password.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		},
		// user sign up reducer logic//
		[user_sign_up_with_email_and_password.pending]: (state, action) => {
			state.status = 'pending';
		},
		[user_sign_up_with_email_and_password.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.authenticated = true;

			state.error = null;
		},
		[user_sign_up_with_email_and_password.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export default authSlice.reducer;
export const { user_sign_in, user_sign_out } = authSlice.actions;

// third party sign in
export const Social_Login = async (selectedProvider) => {
	let provider;
	if (selectedProvider === 'facebook') {
		provider = new firebase.auth.FacebookAuthProvider();
	}
	if (selectedProvider === 'google') {
		provider = new firebase.auth.GoogleAuthProvider();
	}
	try {
		const result = await firebase.auth().signInWithPopup(provider);
		// console.log(result);
		if (result.additionalUserInfo.isNewUser) {
			await setUserProfileData(result.user);
		}
	} catch (error) {
		throw error;
	}
};

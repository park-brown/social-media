import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../app/api/config/firebase';

const db = firebase.firestore();
const initialState = {
	status: 'idle',
	current_user_profile: [],
	error: null,
};

export const get_user_profile = createAsyncThunk(
	'profile/get_user_profile',
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await db.collection('user').doc(id).get();
			const data = response.data();

			return {
				...data,
				uid: response.id,
				createdAt: data.createdAt.toDate(),
			};
		} catch (error) {
			rejectWithValue('something went wrong');
		}
	},
);
export const update_user_profile = createAsyncThunk(
	'profile/update_user_profile',
	async ({ values }, { dispatch }) => {
		const user = firebase.auth().currentUser;
		try {
			if (user.displayName !== values.displayName) {
				await user.updateProfile({
					displayName: values.displayName,
				});
			}
			await db.collection('user').doc(user.uid).update(values);
			const response = await db.collection('user').doc(user.uid).get();

			const data = response.data();
			return {
				...data,

				createdAt: data.createdAt.toDate(),
			};
		} catch (error) {
			throw error;
		}
	},
);

const profileSlice = createSlice({
	name: 'profile',
	initialState: initialState,
	reducers: {},
	extraReducers: {
		[get_user_profile.pending]: (state) => {
			state.status = 'pending';
		},
		[get_user_profile.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.current_user_profile = action.payload;
		},
		[get_user_profile.rejected]: (state, action) => {
			state.status = 'failed';
		},
		// [update_user_profile.pending]: (state) => {
		// 	state.status = 'pending';
		// },
		[update_user_profile.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.current_user_profile = action.payload;
		},
		// [update_user_profile.rejected]: (state, action) => {
		// 	state.status = 'failed';
		// 	state.error = action.payload;
		// },
	},
});

export default profileSlice.reducer;

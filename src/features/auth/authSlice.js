import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { authenticated: true, current_user: null },
	reducers: {
		user_sign_in: (state, action) => {
			state.authenticated = true;
			state.current_user = action.payload;
		},
		user_sign_out: (state, action) => {
			state.authenticated = false;
			state.current_user = null;
		},
	},
});

export default authSlice.reducer;
export const { user_sign_in, user_sign_out } = authSlice.actions;

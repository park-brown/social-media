import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: null,
	reducers: {
		open_Modal: (state, action) => {
			const { modalType, modalProps } = action.payload;

			return {
				modalProps,
				modalType,
			};
		},
		close_Modal: (state, action) => {
			return null;
		},
	},
});

export default modalSlice.reducer;
export const { open_Modal, close_Modal } = modalSlice.actions;

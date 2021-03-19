import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/EventSlice';
import modalReducer from '../app/common/Modals/Modal_Slice';
import authReducer from '../features/auth/authSlice';
export default configureStore({
	reducer: {
		events: eventReducer,
		modals: modalReducer,
		auth: authReducer,
	},
});

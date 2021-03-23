import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/EventSlice';
import modalReducer from '../app/common/Modals/Modal_Slice';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
const store = configureStore({
	reducer: {
		events: eventReducer,
		modals: modalReducer,
		auth: authReducer,
		profile: profileReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export default store;

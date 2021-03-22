import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/EventSlice';
import modalReducer from '../app/common/Modals/Modal_Slice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
	reducer: {
		events: eventReducer,
		modals: modalReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import eventReducer from '../features/events/EventSlice';
import modalReducer from '../app/common/Modals/Modal_Slice';
import authReducer from '../features/auth/authSlice';
export default configureStore({
	reducer: {
		events: eventReducer,
		modals: modalReducer,
		auth: authReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			// Ignore these action types
			ignoredActions: ['/events/fetchEvent'],
			// Ignore these field paths in all actions
			ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
			// Ignore these paths in the state
			ignoredPaths: ['events.events.0.date', 'events.events.1.date'],
		},
	}),
});

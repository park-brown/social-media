import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/EventSlice';
export default configureStore({
	reducer: {
		events: eventReducer,
	},
});

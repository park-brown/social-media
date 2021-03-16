import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from '../../app/api/sampleData';

const initialState = sampleData;

const eventSlice = createSlice({
	name: 'events',
	initialState: initialState,
	reducers: {
		add_event: (state, action) => {
			state.push(action.payload);
		},
		update_event: (state, action) => {
			const { id, values } = action.payload;
			const index = state.findIndex((e) => e.id === id);
			state[index] = values;
		},
		delete_event: (state, action) => {
			return state.filter((e) => e.id !== action.payload);
		},
	},
});

export default eventSlice.reducer;

export const { add_event, update_event, delete_event } = eventSlice.actions;

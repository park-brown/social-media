import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../app/api/config/firebase';
import { sampleData } from '../../app/api/sampleData';
const db = firebase.firestore();
const initialState = {
	status: 'idle',
	events: [...sampleData],
	error: null,
};
export const fetchEvent = createAsyncThunk(
	'/events/fetchEvent',
	async (_, { rejectWithValue }) => {
		try {
			const { docs } = await db.collection('events').get();

			const format_data = docs.map((doc, index) => {
				const data = doc.data();
				return {
					...data,
					date: data.date.toDate(),
					id: docs[index].id,
				};
			});

			return format_data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);
export const fetchSingleEvent = createAsyncThunk(
	'/events/fetchSingleEvent',
	async ({ id }, { rejectWithValue }) => {
		try {
			const response = await db.collection('events').doc(id).get();

			const data = response.data();
			return {
				...data,
				id: response.id,
				date: data.date.toDate(),
			};
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const eventSlice = createSlice({
	name: 'events',
	initialState: initialState,
	reducers: {
		add_event: (state, action) => {
			state.events.push(action.payload);
		},
		update_event: (state, action) => {
			const { id, values } = action.payload;
			const index = state.findIndex((e) => e.id === id);
			state.events[index] = values;
		},
		// delete_event: (state, action) => {
		// 	return state.events.filter((e) => e.id !== action.payload);
		// },
	},
	extraReducers: {
		[fetchEvent.pending]: (state) => {
			state.status = 'pending';
		},
		[fetchEvent.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			state.events = [...state.events, ...action.payload];
		},
		[fetchEvent.rejected]: (state, action) => {
			state.stats = 'failed';
			state.error = action.payload;
		},
		[fetchSingleEvent.pending]: (state) => {
			state.status = 'pending';
		},
		[fetchSingleEvent.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			state.events.push(action.payload);
		},
		[fetchSingleEvent.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		},
	},
});

export default eventSlice.reducer;

export const { add_event, update_event, delete_event } = eventSlice.actions;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from '../../app/api/config/firebase';

const db = firebase.firestore();
const initialState = {
	status: 'idle',
	events: [],
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
			return rejectWithValue({ message: 'something went wrong' });
		}
	},
);
export const addEventToFirestore = createAsyncThunk(
	'events/addEventTofirestore',
	async ({ values }, { rejectWithValue }) => {
		try {
			const user = firebase.auth().currentUser;
			console.log(user);
			const writeDoc = await db.collection('events').add({
				...values,
				hostUid: user.uid,
				hostedBy: user.displayName,
				hostPhotoURL: user.photoURL || null,
				attendees: firebase.firestore.FieldValue.arrayUnion({
					id: user.uid,
					name: user.displayName,
					photoURL: user.photoURL || null,
				}),
				attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
			});

			const readDoc = await db.collection('events').doc(writeDoc.id).get();
			const data = readDoc.data();
			return {
				...data,
				date: data.date.toDate(),
				id: readDoc.id,
			};
		} catch (error) {
			rejectWithValue({ message: 'something went wrong' });
		}
	},
);
export const updateEventInFirestore = createAsyncThunk(
	'events/updateEventInFirestore',
	async ({ id, values }, { rejectWithValue }) => {
		try {
			await db.collection('events').doc(id).update(values);
			const response = await db.collection('events').doc(id).get();
			const data = response.data();
			return {
				...data,
				date: data.date.toDate(),
				id: response.id,
			};
		} catch (error) {
			rejectWithValue({ message: 'something went wrong' });
		}
	},
);
export const deleteEventInFirestore = createAsyncThunk(
	'events/deleteEventInFirestore',
	async ({ id }, { rejectWithValue }) => {
		try {
			await db.collection('events').doc(id).delete();
			return { id };
		} catch (error) {
			rejectWithValue(error.message);
		}
	},
);

export const user_join_event = createAsyncThunk(
	'events/user_join_event',
	async ({ event }, { rejectWithValue }) => {
		try {
			const user = firebase.auth().currentUser;
			await db
				.collection('events')
				.doc(event.id)
				.update({
					attendees: firebase.firestore.FieldValue.arrayUnion({
						id: user.uid,
						name: user.displayName,
						photoURL: user.photoURL || null,
					}),
					attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
				});
			const response = await db.collection('events').doc(event.id).get();
			const data = response.data();
			return data;
		} catch (error) {
			rejectWithValue(error.message);
		}
	},
);
export const user_cancel_event = createAsyncThunk(
	'events/user_cancel_event',
	async ({ event }) => {
		try {
			const user = firebase.auth().currentUser;
			const eventDoc = await db.collection('events').doc(event.id).get();
			await db
				.collection('events')
				.doc(event.id)
				.update({
					attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
					attendees: eventDoc
						.data()
						.attendees.filter((attendee) => attendee.id !== user.uid),
				});

			const response = await db.collection('events').doc(event.id).get();
			const data = response.data();
			return data;
		} catch (error) {}
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
	},
	extraReducers: {
		//fetch all//
		[fetchEvent.pending]: (state) => {
			state.status = 'pending';
		},
		[fetchEvent.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			state.events = [...state.events, ...action.payload];
		},
		[fetchEvent.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},

		//fetch single doc//
		[fetchSingleEvent.pending]: (state) => {
			state.status = 'pending';
		},
		[fetchSingleEvent.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			const { id } = action.payload;
			const existing_event = state.events.find((event) => event.id === id);
			if (!existing_event) {
				state.events.push(action.payload);
			} else {
				return;
			}
		},
		[fetchSingleEvent.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		//update single doc
		[updateEventInFirestore.pending]: (state) => {
			state.status = 'pending';
		},
		[updateEventInFirestore.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			const { id } = action.payload;
			const index = state.events.findIndex((event) => event.id === id);
			state.events[index] = action.payload;
		},
		[updateEventInFirestore.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		//add new doc//
		[addEventToFirestore.pending]: (state) => {
			state.status = 'pending';
		},
		[addEventToFirestore.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			state.events.push(action.payload);
		},
		[addEventToFirestore.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		//delete single doc
		[deleteEventInFirestore.pending]: (state) => {
			state.status = 'pending';
		},
		[deleteEventInFirestore.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			const { id } = action.payload;
			const index = state.events.find((e) => e.id === id);
			state.events.splice(index, 1);
		},
		[deleteEventInFirestore.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		//user join event

		[user_join_event.fulfilled]: (state, action) => {
			const { attendeeIds, attendees, hostUid } = action.payload;
			const index = state.events.findIndex(
				(event) => event.hostUid === hostUid,
			);

			state.events[index].attendeeIds = attendeeIds;
			state.events[index].attendees = attendees;
		},
		// user cancel event
		[user_cancel_event.fulfilled]: (state, action) => {
			const { attendeeIds, attendees, hostUid } = action.payload;
			const index = state.events.findIndex(
				(event) => event.hostUid === hostUid,
			);

			state.events[index].attendeeIds = attendeeIds;
			state.events[index].attendees = attendees;
		},
	},
});

export default eventSlice.reducer;

export const { add_event, update_event, delete_event } = eventSlice.actions;

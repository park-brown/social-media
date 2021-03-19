import firebase from '../api/config/firebase';

const db = firebase.firestore();

export const getEventsFromFirestore = (observer) => {
	return db.collection('events').onSnapshot(observer);
};

export function dataFromSnapshot(snapshot) {
	if (snapshot.exist === false) return;
	else {
		const data = snapshot.data();
		return {
			...data,
			date: data.date.toDate(),
			id: snapshot.id,
		};
	}
}

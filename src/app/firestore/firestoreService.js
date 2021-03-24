import firebase from '../api/config/firebase';

const db = firebase.firestore();

// export const getEventsFromFirestore = (observer) => {
// 	return db.collection('events').onSnapshot(observer);
// };

// export function dataFromSnapshot(snapshot) {
// 	if (snapshot.exist === false) return;
// 	else {
// 		const data = snapshot.data();
// 		return {
// 			...data,
// 			date: data.date.toDate(),
// 			id: snapshot.id,
// 		};
// 	}
// }
export function cancelEventToggle(event) {
	return db.collection('events').doc(event.id).update({
		isCancelled: !event.isCancelled,
	});
}
export async function updateUserProfilePhoto(downloadURL, filename) {
	const user = firebase.auth().currentUser;
	console.log(user);
	const userDocRef = db.collection('user').doc(user.uid);
	console.log(userDocRef);
	try {
		const userDoc = await userDocRef.get();
		console.log(userDoc.data());

		if (!userDoc.data().photoURL) {
			await db.collection('user').doc(user.uid).update({
				photoURL: downloadURL,
			});
			await user.updateProfile({
				photoURL: downloadURL,
			});
		}
		return await db.collection('user').doc(user.uid).collection('photos').add({
			name: filename,
			url: downloadURL,
		});
	} catch (error) {
		throw error;
	}
}
export function getUserPhotos(userUid) {
	return db.collection('user').doc(userUid).collection('photos');
}

export async function setMainPhoto(photo) {
	const user = firebase.auth().currentUser;
	try {
		await db.collection('user').doc(user.uid).update({
			photoURL: photo.url,
		});
		return await user.updateProfile({
			photoURL: photo.url,
		});
	} catch (error) {
		throw error;
	}
}

export function deletePhotoFromCollection(photoId) {
	const userUid = firebase.auth().currentUser.uid;
	return db
		.collection('user')
		.doc(userUid)
		.collection('photos')
		.doc(photoId)
		.delete();
}

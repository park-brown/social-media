import firebase from '../api/config/firebase';

export function uploadToFirebaseStorage(file, filename) {
	const user = firebase.auth().currentUser;
	const storageRef = firebase.storage().ref();
	return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}

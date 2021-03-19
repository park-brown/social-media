import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCXEvmR_pKEErY7g-FSO4ppqKCXypDgTpI',
	authDomain: 'revent-course-3c93c.firebaseapp.com',
	projectId: 'revent-course-3c93c',
	storageBucket: 'revent-course-3c93c.appspot.com',
	messagingSenderId: '727690904069',
	appId: '1:727690904069:web:2d526889fbcd20a3b6d26c',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

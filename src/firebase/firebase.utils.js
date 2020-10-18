import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCUXZlPr32wYrTVKQXBd6gJs2fW2ribx6U",
    authDomain: "closet-clothing.firebaseapp.com",
    databaseURL: "https://closet-clothing.firebaseio.com",
    projectId: "closet-clothing",
    storageBucket: "closet-clothing.appspot.com",
    messagingSenderId: "24699289526",
    appId: "1:24699289526:web:f797465c38804d1acccb17",
    measurementId: "G-2QZJK7XKS8"
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// For Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
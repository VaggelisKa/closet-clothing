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

export const createUserProfileDocument = async (userObject, additionalData) => {
    if (!userObject) 
        return;
    
    const userRef = firestore.doc(`users/${userObject.uid}`);
    const userSnapShot = await userRef.get();

    if (!userSnapShot.exists) {
        const { displayName, email } = userObject;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            return error.message;
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// For Google Auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// For Facebook Auth
const provider2 = new firebase.auth.FacebookAuthProvider();
provider2.addScope('email');
provider2.setCustomParameters({'display': 'popup'});
export const signInWithFacebook = () => auth.signInWithPopup(provider2);

export default firebase;
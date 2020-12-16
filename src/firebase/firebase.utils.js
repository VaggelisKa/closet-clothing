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

export const getUserCartRef = async userId => {
    const cartsRef = firestore.collection('carts').where('userId', '==', userId);
    const cartSnapshot = await cartsRef.get();

    if (cartSnapshot.empty) {
        const cartDocRef = firestore.collection('carts').doc();
        await cartDocRef.set(
            {
                userId,
                cartItems: []
            }
        );

        return cartDocRef;
    } else {
        return cartSnapshot.docs[0].ref;
    }
}


firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    // From Object array to Object map
    return transformedCollection.reduce((accumulator, collection)  => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {});
};

export const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
       const unsubscribe = auth.onAuthStateChanged(user => {
           unsubscribe();
           resolve(user);
       }, reject);
   }); 
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });

    return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// For Google Auth
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// For Facebook Auth
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.setCustomParameters({'display': 'popup'});
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;
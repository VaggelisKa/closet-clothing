import { takeLatest, call, put, all } from 'redux-saga/effects';

import userActionTypes from './user.types';
import { 
    signInSuccess,
    signInFailure
} from './user.actions';

import { 
    auth, 
    googleProvider, 
    facebookProvider,
    createUserProfileDocument 
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } 
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } 
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        userActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}


export function* signInWithFacebook() {
    try {
        const { user } = yield auth.signInWithPopup(facebookProvider);
        yield getSnapshotFromUserAuth(user);
    } 
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onFacebookSignInStart() {
    yield takeLatest(
        userActionTypes.FACEBOOK_SIGN_IN_START,
        signInWithFacebook
    );
}


export function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }
    catch (error) {
        yield put(signInFailure(error));
    } 
}

export function* onEmailSignInStart() {
    yield takeLatest(
        userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    );
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onFacebookSignInStart),
            call(onEmailSignInStart)
        ]
    );
}
import { takeLatest, call, put, all, takeEvery } from 'redux-saga/effects';

import userActionTypes from './user.types';
import { 
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure
} from './user.actions';

import { 
    auth, 
    googleProvider, 
    facebookProvider,
    createUserProfileDocument,
    getCurrentUser
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

export function* isUserAuthenticated() {
    try {
        const user = yield getCurrentUser();
        if (!user) return;

        yield getSnapshotFromUserAuth(user);
    } 
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(
        userActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}


export function* signOutAsync() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } 
    catch (error) {
        yield put(signOutFailure());
    }
}

export function* onSignOutStart() {
    yield takeEvery(
        userActionTypes.SIGN_OUT_START,
        signOutAsync
    );
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onFacebookSignInStart),
            call(onEmailSignInStart),
            call(onCheckUserSession),
            call(onSignOutStart)
        ]
    );
}
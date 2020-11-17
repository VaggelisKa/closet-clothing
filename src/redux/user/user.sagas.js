import { takeLatest, call, put, all } from 'redux-saga/effects';

import userActionTypes from './user.types';
import { 
    googleSignInSuccess, 
    googleSignInFailure,
    facebookSignInSuccess,
    facebookSignInFailure
} from './user.actions';

import { 
    auth, 
    googleProvider, 
    facebookProvider,
    createUserProfileDocument 
} from '../../firebase/firebase.utils';

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } 
    catch (error) {
        yield put(googleSignInFailure(error));
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
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(facebookSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } 
    catch (error) {
        yield put(facebookSignInFailure(error));
    }
}

export function* onFacebookSignInStart() {
    yield takeLatest(
        userActionTypes.FACEBOOK_SIGN_IN_START,
        signInWithFacebook
    );
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onFacebookSignInStart)
        ]
    );
}
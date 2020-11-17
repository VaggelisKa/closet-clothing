import userActionTypes from './user.types';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = user => ({
    type: userActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailure = error => ({
    type: userActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const facebookSignInStart = () => ({
    type: userActionTypes.FACEBOOK_SIGN_IN_START
});

export const facebookSignInSuccess = user => ({
    type: userActionTypes.FACEBOOK_SIGN_IN_SUCCESS,
    payload: user
});

export const facebookSignInFailure = error => ({
    type: userActionTypes.FACEBOOK_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = () => ({
    type: userActionTypes.EMAIL_SIGN_IN_START
});

export const emailSignInSuccess = userCredentials => ({
    type: userActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: userCredentials
});

export const emailSignInFailure = error => ({
    type: userActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
});
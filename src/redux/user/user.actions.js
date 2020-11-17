import userActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: userActionTypes.GOOGLE_SIGN_IN_START
});


export const facebookSignInStart = () => ({
    type: userActionTypes.FACEBOOK_SIGN_IN_START
});


export const emailSignInStart = userCredentials => ({
    type: userActionTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
});
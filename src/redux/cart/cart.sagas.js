import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import userActionTypes from '../user/user.types';
import CartActionTypes from './cart.types';
import { getUserCartRef } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../user/user.selectors';
import { selectCartItems } from './cart.selectors';

import { clearCart, setCartFromFirebase } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const cartItems = yield select(selectCartItems);

      yield cartRef.update({ cartItems });
    } catch (error) {
      // console.log(error);
    }
  }
}

export function* checkCartFromFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onSignInSuccess() {
  yield takeLatest(
    userActionTypes.SIGN_IN_SUCCESS,
    checkCartFromFirebase
  );
}

export function* onSignOutSuccess() {
  yield takeLatest(
    userActionTypes.SIGN_OUT_SUCCESS,
    clearCartOnSignOut
  );
}

export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM_FROM_CART,
      CartActionTypes.CLEAR_CART
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all(
    [
      call(onSignOutSuccess),
      call(onCartChange),
      call(onSignInSuccess)
    ]
  );
}

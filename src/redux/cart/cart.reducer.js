import CartActionTypes from './cart.types'
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    isHidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN: 
          return {
              ...state,
              isHidden: !state.isHidden,
          };
          
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };

        case CartActionTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            };
        
        default: 
          return state;
    }
}

export default cartReducer;
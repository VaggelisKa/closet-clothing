import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className="cart-items">
            {
                cartItems.length > 0 ?
                cartItems.map(item => <CartItem key={item.id} item={item}/>) 
                : <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <Button 
            onClick={() => {
                history.push('/checkout'); 
                dispatch(toggleCartHidden());
            }}
        >
        GO TO CHECKOUT
        </Button>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
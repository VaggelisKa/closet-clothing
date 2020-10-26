import React from 'react';

import { connect } from 'react-redux';
import { removeCartItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

import { FcCancel } from 'react-icons/fc'

const CheckoutItem = ({ cartItem, removeItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price * quantity}€</span>
            <div className="remove-button" onClick={() => removeItem(cartItem)}><FcCancel size="23px"/></div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    removeItem: (cartItem) => dispatch(removeCartItem(cartItem)) 
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
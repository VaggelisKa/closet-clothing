import React from 'react';

import { connect } from 'react-redux';
import { removeCartItem, addItem, decreaseCartItemQuantity } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

import { FcCancel } from 'react-icons/fc'
import { AiOutlineMinus } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

const CheckoutItem = ({ cartItem, removeItem, addItem, decreaseQuantity }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt="item"/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="quantity-sign" onClick={() => decreaseQuantity(cartItem)}><AiOutlineMinus size="14px"/></div>
                <span className="value">{quantity}</span>
                <div className="quantity-sign" onClick={() => addItem(cartItem)}><AiOutlinePlus size="14px"/></div>
            </span>
            <span className="price">{price * quantity}€</span>
            <div className="remove-button" onClick={() => removeItem(cartItem)}><FcCancel size="23px"/></div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    removeItem: cartItem => dispatch(removeCartItem(cartItem)),
    addItem: cartItem => dispatch(addItem(cartItem)),
    decreaseQuantity: cartItem => dispatch(decreaseCartItemQuantity(cartItem))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
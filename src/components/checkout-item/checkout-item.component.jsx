import React from 'react';

import './checkout-item.styles.scss';

import { FcCancel } from 'react-icons/fc'

const CheckoutItem = ({ cartItem: { name, imageUrl, quantity, price } }) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item"/>
        </div>
        <span className="name">{name}</span>
        <span className="quantity">{quantity}</span>
        <span className="price">{price * quantity}€</span>
        <div className="remove-button"><FcCancel size="23px"/></div>
    </div>
);

export default CheckoutItem;
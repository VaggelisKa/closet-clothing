import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import './stripe-button.styles.scss';

// import { FaStripe } from 'react-icons/fa';

const StripeCheckoutButton = ({ price }) => {
    const priceInCents = price * 100;
    const publishableKey = 'pk_test_51HkDFWAv6FtYmqRGk8KqeXIbQ9bdvbYamZVzZmmqY32ZPYiAYwroAZabO2iO4eQdSBER3TakakJIFgNqkYvG5Swz00KrRcMqLY';

    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceInCents,
                token
            }
        })
        .then(response => {
            alert('Payment Successfull');
        })
        .catch(error => {
            console.log('Payment error: ', JSON.parse(error));
            alert('There was an issue with your payment!');
        })
    }

    return (
        <StripeCheckout
            label="Checkout Now"
            name="Closet Clothing Ltd."
            billingAddress
            currency="EUR"
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your cart total is ${price}€ `}
            allowRememberMe
            amount={priceInCents}
            panelLabel="Pay"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;
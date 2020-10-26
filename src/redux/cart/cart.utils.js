export const addItemToCart = (cartItems, cartItemToAdd) => {
    const doesExistInCart = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if (doesExistInCart) {
        return cartItems.map(cartItem => 
                cartItem.id === cartItemToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem 
            )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}];
}

export const decreaseQuantity = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== existingCartItem.id);
    }

    return cartItems.map(item =>
            item.id === cartItemToRemove.id 
            ? {...item, quantity: item.quantity - 1} : item
        );
}
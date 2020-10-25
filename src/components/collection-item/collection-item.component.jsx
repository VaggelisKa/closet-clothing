import React from 'react';

import Button from '../button/button.component';

import './collection-item.styles.scss'

const CollectionItem = ({ id, name, price, imageUrl }) => {
    return (
        <div className="collection-item">
            <div 
                className="image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}€</span>
            </div>
            <Button className="custom-button" cssClass="inverted">Add to cart</Button>
        </div>
    )
}

export default CollectionItem
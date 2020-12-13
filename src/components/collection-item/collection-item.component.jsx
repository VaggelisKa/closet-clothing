import React from 'react';
import { connect } from 'react-redux';
import { addItem }  from '../../redux/cart/cart.actions';

import { Link } from 'react-router-dom';

import Button from '../button/button.component';

import './collection-item.styles.scss'

const CollectionItem = ({item, addItem, title }) => {
    const {name, price, imageUrl, id} = item

    return (
        <div className="collection-item">
            <Link to={`/shop/${title.toLowerCase()}/${id}`} className="link">
                <div 
                    className="image"
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                />
            </Link>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}€</span>
            </div>
            <Button className="custom-button" onClick={() => addItem(item)} cssClass="inverted">Add to cart!</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: (item) => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);
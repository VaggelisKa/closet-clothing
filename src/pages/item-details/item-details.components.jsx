import React from 'react';

import { connect } from 'react-redux';
import { selectCollectionItem } from '../../redux/shop/shop.selectors';
import { addItem } from '../../redux/cart/cart.actions';

import Button from '../../components/button/button.component';

import './item-details.styles.scss';

import InnerImageZoom from 'react-inner-image-zoom';

const ItemDetailsPage = ({item, addItem}) => {
    const { imageUrl, name, price } = item;
    const imageProps = {
        src: imageUrl,
        zoomScale: 4
    }

    return (
        <main className="container">
            <div className="left-column">
            <InnerImageZoom {...imageProps} />
            </div>
            <div className="right-column">
                <div className="product-description">
                    <h1>{name}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quam minus quia officiis ut dolorem, quibusdam, dolore commodi iste laudantium aliquid officia aperiam, culpa voluptate earum repellat esse? Cupiditate, doloribus.</p> 
                </div>
                <div className="product-price">
                    <span>{price}€</span>
                    <Button className="custom-button" onClick={() => addItem(item)} cssClass="inverted">Add to cart</Button>
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (state, componentProps) => ({
    item: selectCollectionItem(componentProps.match.params.collectionId, componentProps.match.params.itemId)(state)
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsPage)
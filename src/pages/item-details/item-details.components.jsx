import React from 'react';

import { connect } from 'react-redux';
import { selectCollectionItem } from '../../redux/shop/shop.selectors';

import './item-details.styles.scss';

const ItemDetailsPage = ({item}) => {

    return (
        <div>{item.id}</div>
    );
}

const mapStateToProps = (state, componentProps) => ({
    item: selectCollectionItem(componentProps.match.params.collectionId, componentProps.match.params.itemId)(state)
});

export default connect(mapStateToProps)(ItemDetailsPage)
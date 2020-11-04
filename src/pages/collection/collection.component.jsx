import React from 'react';

import './collection.styles.scss';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collection }) => (
    <div className="collection-page">
        <h2>Category Page</h2>
    </div>
);

const mapStateToProps = (state, componentProps) => ({
    collection: selectCollection(componentProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
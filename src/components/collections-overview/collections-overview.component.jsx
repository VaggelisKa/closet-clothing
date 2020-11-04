import React from 'react';
import PreviewCollection from '../preview-collection/preview-collection.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectShopCollection } from '../../redux/shop/shop.selectors';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <PreviewCollection key={id} {...otherCollectionProps}/>
            ))  
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollection
});

export default connect(mapStateToProps)(CollectionsOverview);
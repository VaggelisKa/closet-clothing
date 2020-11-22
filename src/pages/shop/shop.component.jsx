import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import ItemDetailsPageContainer from '../item-details/item-details.container';


const ShopPage = ({ fetchCollections, match }) => {
    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            <Route exact path={`/shop/:collectionId/:itemId`} component={ItemDetailsPageContainer}/>
        </div>
    );

}


const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollectionsStart()),
});


export default connect(null, mapDispatchToProps)(ShopPage);

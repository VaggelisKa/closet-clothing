import React, { lazy, Suspense, useEffect } from 'react'
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));
const ItemDetailsPageContainer = lazy(() => import('../item-details/item-details.container'));


const ShopPage = ({ fetchCollections, match }) => {
    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    return (
        <div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route exact path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
                <Route exact path={`/shop/:collectionId/:itemId`} component={ItemDetailsPageContainer}/>
            </Suspense>
        </div>
    );

}


const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollectionsStart()),
});


export default connect(null, mapDispatchToProps)(ShopPage);

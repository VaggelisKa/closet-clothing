import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

    componentDidMount() {
        const { fetchCollections } = this.props;
        fetchCollections();
    }

    render() {
        const { match, isCollectionsLoaded } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} render={props => <CollectionsPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollectionsStartAsync()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

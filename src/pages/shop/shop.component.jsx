import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFetchingState } from '../../redux/shop/shop.selectors';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {

    componentDidMount() {
        const { fetchCollections } = this.props;
        fetchCollections();
    }

    render() {
        const { match, isLoading } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props}/>} />
                <Route path={`${match.path}/:collectionId`} render={props => <CollectionsPageWithSpinner isLoading={isLoading} {...props} />}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isLoading: selectFetchingState
});

const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollectionsStartAsync())
});


export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

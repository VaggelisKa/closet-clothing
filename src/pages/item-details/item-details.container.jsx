import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import ItemDetailsPage from './item-details.components';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const ItemDetailsPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(ItemDetailsPage);

export default ItemDetailsPageContainer;
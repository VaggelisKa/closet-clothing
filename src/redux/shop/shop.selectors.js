import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';


const selectShop = state => state.shop;

export const selectShopCollections = memoize(createSelector(
    [selectShop],
    shop => shop.collections
));

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
  );

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize((collectionUrlParam) => createSelector(
    [selectShopCollections],
    collections => collections ? collections[collectionUrlParam] : null
));

export const selectCollectionItem = (collectionUrlParam, collectionItemUrlParam) => createSelector(
    [selectShopCollections],
    collections => collections ? 
        collections[collectionUrlParam].items.find(item => item.id === parseInt(collectionItemUrlParam)) 
        : null
    
);
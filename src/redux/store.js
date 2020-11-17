import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };

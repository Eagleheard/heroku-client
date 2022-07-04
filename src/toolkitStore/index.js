import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import ordersReducer from 'toolkitStore/slices/orders.ts';
import gamesReducer from 'toolkitStore/slices/games.ts';
import authorsReducer from 'toolkitStore/slices/authors.ts';
import discountsReducer from 'toolkitStore/slices/discounts.ts';
import usersReducer from 'toolkitStore/slices/users.ts';
import { cartReducer } from 'store/cart/reducers';
import { fetchUsers } from './thunk/rtkQuery';
import rootSaga from 'store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  ordersReducer,
  gamesReducer,
  authorsReducer,
  discountsReducer,
  usersReducer,
  [fetchUsers.reducerPath]: fetchUsers.reducer,
  cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, sagaMiddleware, fetchUsers.middleware],
});

sagaMiddleware.run(rootSaga);

export default store;

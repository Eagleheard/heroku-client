import { combineReducers } from 'redux';

import { cartReducer } from 'store/cart/reducers';
import { CartState } from './cart/types';

export interface RootState {
  cartReducer: CartState;
}

const rootReducer = combineReducers({
  cartReducer,
});

export default rootReducer;

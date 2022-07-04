import { all } from 'redux-saga/effects';

import watcher from 'store/cart/sagas';

export default function* rootSaga(): Generator {
  yield all([watcher()]);
}

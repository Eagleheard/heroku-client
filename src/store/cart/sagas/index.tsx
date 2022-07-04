import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { socket } from 'config';

import {
  DECREMENT_GAME_REQUEST,
  INCREMENT_GAME_REQUEST,
  REMOVE_GAME_REQUEST,
  GET_CART_REQUEST,
  ADD_GAME_REQUEST,
  GET_DISCOUNT_REQUEST,
  DecrementGameSuccessAction,
  IncrementGameSuccessAction,
  RemoveGameSuccessAction,
  AddGameSuccessAction,
  CLEAR_CART_REQUEST,
} from 'store/cart/types';
import {
  addGameToBasket,
  clearBasket,
  decrementGameFromBasket,
  getBasket,
  incrementGameToBasket,
  removeGameFromBasket,
} from 'api/fetchCart';
import { fetchAchievement } from 'api/fetchAchievements';
import {
  changeQuantitySuccess,
  getCartSuccess,
  removeGameSuccess,
  getCartFailure,
  getCartRequest,
  getDiscountSuccess,
  getDiscountRequest,
  addGameSuccess,
  addGameFailure,
  getDiscountFailure,
  changeQuantityFailure,
  removeGameFailure,
  clearCartSuccess,
  clearCartFailure,
  addGameRequest,
} from '../actions';

export function* getStore() {
  try {
    yield put(getCartRequest());
    const { data } = yield call(getBasket);
    yield put(getCartSuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(getCartFailure(String(message)));
  }
}

export function* getDiscount() {
  try {
    yield put(getDiscountRequest());
    const { data } = yield call(fetchAchievement);
    yield put(getDiscountSuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(getDiscountFailure(String(message)));
  }
}

export function* addGameToStore({ payload }: AddGameSuccessAction) {
  try {
    yield put(addGameRequest());
    const { data } = yield call(addGameToBasket, { ...payload });
    yield socket.emit('buyingGame', { id: payload.gameId });
    yield put(addGameSuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(addGameFailure(String(message)));
  }
}

function* decrementGameFromStore({ payload }: DecrementGameSuccessAction) {
  try {
    const { data } = yield call(decrementGameFromBasket, { ...payload });
    yield put(changeQuantitySuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(changeQuantityFailure(String(message)));
  }
}

export function* incrementGameToStore({ payload }: IncrementGameSuccessAction) {
  try {
    const { data } = yield call(incrementGameToBasket, { ...payload });
    yield put(changeQuantitySuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(changeQuantityFailure(String(message)));
  }
}

function* removeGameFromStore({ payload }: RemoveGameSuccessAction) {
  try {
    const { data } = yield call(removeGameFromBasket, { ...payload });
    yield put(removeGameSuccess(data));
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(removeGameFailure(String(message)));
  }
}

export function* clearStore() {
  try {
    yield call(clearBasket);
    yield put(clearCartSuccess());
  } catch ({
    response: {
      data: { message },
    },
  }) {
    yield put(clearCartFailure(String(message)));
  }
}

function* watcher() {
  yield takeLeading(ADD_GAME_REQUEST, addGameToStore);
  yield takeEvery(DECREMENT_GAME_REQUEST, decrementGameFromStore);
  yield takeEvery(INCREMENT_GAME_REQUEST, incrementGameToStore);
  yield takeLeading(GET_CART_REQUEST, getStore);
  yield takeLeading(GET_DISCOUNT_REQUEST, getDiscount);
  yield takeLeading(CLEAR_CART_REQUEST, clearStore);
  yield takeEvery(REMOVE_GAME_REQUEST, removeGameFromStore);
}

export default watcher;

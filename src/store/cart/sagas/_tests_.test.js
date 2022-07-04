import { runSaga } from 'redux-saga';

import * as cartApi from 'api/fetchCart';
import * as achievementApi from 'api/fetchAchievements';
import {
  getStore,
  getDiscount,
  addGameToStore,
  incrementGameToStore,
  clearStore,
} from 'store/cart/sagas';
import {
  getCartSuccess,
  getDiscountSuccess,
  addGameSuccess,
  changeQuantitySuccess,
  clearCartSuccess,
} from '../actions';

describe('Cart', () => {
  it('should get games that in cart', async () => {
    const dispatchedActions = [];

    const mockedBasket = { data: [] };
    cartApi.getBasket = jest.fn(() => Promise.resolve(mockedBasket));
    const fakeStore = {
      getState: () => ({}),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, getStore).done;
    expect(cartApi.getBasket.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(getCartSuccess([]));
  });

  it('should get discounts for 1 user', async () => {
    const dispatchedActions = [];

    const mockedAchievements = { data: [] };
    achievementApi.fetchAchievement = jest.fn(() => Promise.resolve(mockedAchievements));

    const fakeStore = {
      getState: () => ({ discounts: [] }),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, getDiscount).done;
    expect(achievementApi.fetchAchievement.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(getDiscountSuccess([]));
  });

  it('should add game to cart', async () => {
    const dispatchedActions = [];

    const mockedGame = { data: [] };
    cartApi.addGameToBasket = jest.fn(() => Promise.resolve(mockedGame));

    const fakeStore = {
      getState: () => ({ id: 1, value: 1 }),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, addGameToStore, { payload: { id: 1, value: 1 } }).done;
    expect(cartApi.addGameToBasket.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(addGameSuccess([]));
  });

  it('should increment game count', async () => {
    const dispatchedActions = [];

    const mockedGame = { data: [{ id: 3, value: 2 }] };
    cartApi.incrementGameToBasket = jest.fn(() => Promise.resolve(mockedGame));

    const fakeStore = {
      getState: () => ({}),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, incrementGameToStore, { id: 3 }).done;
    expect(cartApi.incrementGameToBasket.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(changeQuantitySuccess([{ id: 3, value: 2 }]));
  });

  it('should return cleared cart', async () => {
    const dispatchedActions = [];

    const mockedBasket = { data: [] };
    cartApi.clearBasket = jest.fn(() => Promise.resolve(mockedBasket));
    const fakeStore = {
      getState: () => ({}),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, clearStore).done;
    expect(cartApi.clearBasket.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(clearCartSuccess());
  });
});

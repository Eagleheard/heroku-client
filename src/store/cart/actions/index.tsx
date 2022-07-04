import {
  INCREMENT_GAME_REQUEST,
  DECREMENT_GAME_REQUEST,
  REMOVE_GAME_REQUEST,
  GET_CART_REQUEST,
  CHANGE_QUANTITY_SUCCESS,
  REMOVE_GAME_SUCCESS,
  REMOVE_GAME_FAILURE,
  GET_CART_SUCCESS,
  ADD_GAME_REQUEST,
  ADD_GAME_SUCCESS,
  ADD_GAME_FAILURE,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAILURE,
  GET_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CHANGE_QUANTITY_FAILURE,
  CLEAR_CART_SUCCESS,
  GetCartSuccessAction,
  DecrementGameSuccessAction,
  RemoveGameSuccessAction,
  GET_DISCOUNT_REQUEST,
  GetDiscountSuccessAction,
  AddGameSuccessAction,
  ClearCartRequestAction,
  CLEAR_CART_FAILURE,
} from 'store/cart/types';

export function addGameRequest(gameId?: number, quantity?: number) {
  return {
    type: ADD_GAME_REQUEST,
    payload: {
      gameId,
      value: quantity,
    },
  };
}

export function addGameSuccess(payload: AddGameSuccessAction) {
  return {
    type: ADD_GAME_SUCCESS,
    payload,
  };
}

export function addGameFailure(error: string) {
  return {
    type: ADD_GAME_FAILURE,
    payload: {
      error,
    },
  };
}

export function decrementGameRequest(gameId?: number) {
  return {
    type: DECREMENT_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function changeQuantitySuccess(payload: DecrementGameSuccessAction) {
  return {
    type: CHANGE_QUANTITY_SUCCESS,
    payload,
  };
}

export function changeQuantityFailure(error: string) {
  return {
    type: CHANGE_QUANTITY_FAILURE,
    payload: {
      error,
    },
  };
}

export function incrementGameRequest(gameId?: number) {
  return {
    type: INCREMENT_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function getDiscountRequest() {
  return {
    type: GET_DISCOUNT_REQUEST,
  };
}

export function getDiscountSuccess(payload?: GetDiscountSuccessAction) {
  return {
    type: GET_DISCOUNT_SUCCESS,
    payload,
  };
}

export function getDiscountFailure(error: string) {
  return {
    type: GET_DISCOUNT_FAILURE,
    payload: {
      error,
    },
  };
}

export function getCartSuccess(payload?: GetCartSuccessAction) {
  return {
    type: GET_CART_SUCCESS,
    payload,
  };
}

export function getCartRequest() {
  return {
    type: GET_CART_REQUEST,
  };
}

export function getCartFailure(error: string) {
  return {
    type: GET_CART_FAILURE,
    payload: {
      error,
    },
  };
}

export function clearCartRequest(payload?: ClearCartRequestAction) {
  return {
    type: CLEAR_CART_REQUEST,
    payload,
  };
}

export function clearCartSuccess(payload?: ClearCartRequestAction) {
  return {
    type: CLEAR_CART_SUCCESS,
    payload,
  };
}

export function clearCartFailure(error: string) {
  return {
    type: CLEAR_CART_FAILURE,
    payload: {
      error,
    },
  };
}

export function removeGameRequest(gameId: number) {
  return {
    type: REMOVE_GAME_REQUEST,
    payload: {
      gameId,
    },
  };
}

export function removeGameSuccess(payload: RemoveGameSuccessAction) {
  return {
    type: REMOVE_GAME_SUCCESS,
    payload,
  };
}

export function removeGameFailure(error: string) {
  return {
    type: REMOVE_GAME_FAILURE,
    payload: {
      error,
    },
  };
}

export const ADD_GAME_REQUEST = 'ADD_GAME_REQUEST';
export const ADD_GAME_SUCCESS = 'ADD_GAME_SUCCESS';
export const ADD_GAME_FAILURE = 'ADD_GAME_FAILURE';
export const REMOVE_GAME_REQUEST = 'REMOVE_GAME_REQUEST';
export const REMOVE_GAME_SUCCESS = 'REMOVE_GAME_SUCCESS';
export const REMOVE_GAME_FAILURE = 'REMOVE_GAME_FAILURE';
export const DECREMENT_GAME_REQUEST = 'DECREMENT_GAME_REQUEST';
export const DECREMENT_GAME_SUCCESS = 'DECREMENT_GAME_SUCCESS';
export const INCREMENT_GAME_REQUEST = 'INCREMENT_GAME_REQUEST';
export const INCREMENT_GAME_SUCCESS = 'INCREMENT_GAME__SUCCESS';
export const CHANGE_QUANTITY_SUCCESS = 'CHANGE_QUANTITY_SUCCESS';
export const CHANGE_QUANTITY_FAILURE = 'CHANGE_QUANTITY_FAILURE';
export const CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';
export const GET_DISCOUNT_SUCCESS = 'GET_DISCOUNT_SUCCESS';
export const GET_DISCOUNT_REQUEST = 'GET_DISCOUNT_REQUEST';
export const GET_DISCOUNT_FAILURE = 'GET_DISCOUNT_FAILURE';

export interface AddGameRequestAction {
  type: typeof ADD_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface AddGameSuccessAction {
  type: typeof ADD_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface AddGameFailureAction {
  type: typeof ADD_GAME_FAILURE;
  gameId: number;
  value: number;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface IncrementGameRequestAction {
  type: typeof INCREMENT_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId?: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface IncrementGameSuccessAction {
  type: typeof INCREMENT_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface RemoveGameRequestAction {
  type: typeof REMOVE_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface RemoveGameSuccessAction {
  type: typeof REMOVE_GAME_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface RemoveGameFailureAction {
  type: typeof REMOVE_GAME_FAILURE;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface DecrementGameRequestAction {
  type: typeof DECREMENT_GAME_REQUEST;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface DecrementGameSuccessAction {
  type: typeof CHANGE_QUANTITY_SUCCESS;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface ChangeQuantityFailureAction {
  type: typeof CHANGE_QUANTITY_FAILURE;
  gameId: number;
  value: number;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    error?: string;
  };
}

export interface GetDiscountRequestAction {
  type: typeof GET_DISCOUNT_REQUEST;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
    error?: string;
  };
}

export interface GetDiscountSuccessAction {
  type: typeof GET_DISCOUNT_SUCCESS;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
    error?: string;
  };
}

export interface GetDiscountFailureAction {
  type: typeof GET_DISCOUNT_FAILURE;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
    error?: string;
  };
}

export interface GetCartRequestAction {
  type: typeof GET_CART_REQUEST;
  payload: {
    id: number;
    userId: number;
    gameId: number;
    quantity: number;
    isLoading?: boolean;
    error?: string;
  };
}

export interface GetCartSuccessAction {
  type: typeof GET_CART_SUCCESS;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity?: number;
    error?: string;
  };
}

export interface GetCartFailureAction {
  type: typeof GET_CART_FAILURE;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity?: number;
    error?: string;
  };
}

export interface ClearCartRequestAction {
  type: typeof CLEAR_CART_REQUEST;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity?: number;
    error?: string;
  };
}

export interface ClearCartSuccessAction {
  type: typeof CLEAR_CART_SUCCESS;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity?: number;
    error?: string;
  };
}

export interface ClearCartFailureAction {
  type: typeof CLEAR_CART_FAILURE;
  payload: {
    id?: number;
    userId?: number;
    gameId: number;
    quantity?: number;
    error?: string;
  };
}

export type CartActionTypes =
  | AddGameRequestAction
  | AddGameFailureAction
  | AddGameSuccessAction
  | RemoveGameRequestAction
  | RemoveGameSuccessAction
  | RemoveGameFailureAction
  | IncrementGameRequestAction
  | IncrementGameSuccessAction
  | DecrementGameRequestAction
  | DecrementGameSuccessAction
  | ChangeQuantityFailureAction
  | ClearCartRequestAction
  | ClearCartSuccessAction
  | ClearCartFailureAction
  | GetCartSuccessAction
  | GetCartFailureAction
  | GetCartRequestAction
  | GetDiscountSuccessAction
  | GetDiscountRequestAction
  | GetDiscountFailureAction;

export interface CartState {
  cartReducer: {
    cart: {
      id: number;
      gameId: number;
      userId: number;
      quantity: number;
      game: {
        id: number;
        name: string;
        price: number;
        image: string;
        disk: boolean;
        digital: boolean;
        discount: {
          discountCount: string;
        };
      };
    }[];
    isLoading: boolean;
    isTimerActive: boolean;
    gameError: string;
    cartError: string;
    achievements: {
      id: number;
      isAchieved: boolean;
      achievement: {
        name: string;
        description: string;
        discount: number;
      };
    }[];
  };
}

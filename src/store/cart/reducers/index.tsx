import {
  GET_CART_SUCCESS,
  CartActionTypes,
  REMOVE_GAME_SUCCESS,
  REMOVE_GAME_FAILURE,
  CHANGE_QUANTITY_SUCCESS,
  CHANGE_QUANTITY_FAILURE,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_DISCOUNT_REQUEST,
  GET_DISCOUNT_SUCCESS,
  GET_DISCOUNT_FAILURE,
  ADD_GAME_FAILURE,
  ADD_GAME_REQUEST,
  ADD_GAME_SUCCESS,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
} from 'store/cart/types';

const initialState = {
  cart: [
    {
      userId: 0,
      gameId: 0,
      quantity: 0,
      game: {
        id: 0,
        name: '',
        price: 0,
        image: 0,
        disk: null,
        digital: null,
      },
    },
  ],
  isLoading: null,
  isTimerActive: false,
  cartError: null,
  gameError: null,
  achievements: [],
};

export function cartReducer(state = initialState, { type, payload }: CartActionTypes) {
  switch (type) {
    case ADD_GAME_FAILURE:
      return {
        ...state,
        gameError: payload.error,
        isLoading: false,
      };
    case ADD_GAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_GAME_SUCCESS:
      return {
        ...state,
        cart: payload,
        isTimerActive: true,
        isLoading: false,
        gameError: '',
        cartError: '',
      };
    case CHANGE_QUANTITY_SUCCESS:
      return {
        ...state,
        cart: state.cart.map((game) => (game.gameId === payload.gameId ? payload : game)),
      };
    case CHANGE_QUANTITY_FAILURE:
      return {
        ...state,
        cartError: payload.error,
        isLoading: false,
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(({ gameId }) => gameId !== payload.gameId),
        isTimerActive: state.cart.length === 1 ? false : true,
      };
    case REMOVE_GAME_FAILURE:
      return {
        ...state,
        cartError: payload.error,
        isLoading: false,
      };
    case GET_DISCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        achievements: payload,
        isLoading: false,
        cartError: '',
      };
    case GET_DISCOUNT_FAILURE:
      return {
        ...state,
        cartError: payload.error,
        isLoading: false,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: payload,
        isLoading: false,
        isTimerActive: state.cart.length === 0 ? false : true,
        cartError: '',
      };
    case GET_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        cartError: payload.error,
        isLoading: false,
      };
    case CLEAR_CART_REQUEST:
      return {
        ...state,
      };
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        cart: [],
        isLoading: false,
        isTimerActive: false,
        gameError: '',
        cartError: '',
      };
    case CLEAR_CART_FAILURE:
      return {
        ...state,
        cartError: payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}

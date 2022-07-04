import { AxiosRequestConfig } from 'axios';

import { AdminPanelState } from 'toolkitStore/types';
import { fetchAllAuthors } from 'api/fetchAuthor';
import { fetchGames } from 'api/fetchGames';
import {
  blockUser,
  createDiscounts,
  createNewAuthor,
  createNewGame,
  getAllOrders,
  getAllUsers,
  getDiscounts,
  updateAuthor,
  updateGame,
} from 'api/adminRequests';
import {
  IDiscountParams,
  INewAuthorParams,
  INewGameParams,
  IOrderParams,
  IUserParams,
} from 'types/interfaces';
import {
  addDiscountsRequest,
  addDiscountsFailure,
  getDiscountsRequest,
  getDiscountsSuccess,
  getDiscountsFailure,
  addDiscountsSuccess,
} from 'toolkitStore/actions/discounts';
import {
  addNewGameRequest,
  addNewGameFailure,
  updateGameRequest,
  updateGameFailure,
  updateGameSuccess,
  addNewGameSuccess,
  getAllGamesRequest,
  getAllGamesSuccess,
  getAllGamesFailure,
} from 'toolkitStore/actions/games';
import { getOrdersRequest, getOrdersSuccess, getOrdersFailure } from 'toolkitStore/actions/orders';
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  blockUserRequest,
  blockUserSuccess,
  blockUserFailure,
} from 'toolkitStore/actions/users';
import {
  addNewAuthorSuccess,
  getAllAuthorsFailure,
  getAllAuthorsRequest,
  getAllAuthorsSuccess,
  updateAuthorFailure,
  updateAuthorRequest,
  updateAuthorSuccess,
  addNewAuthorRequest,
  addNewAuthorFailure,
} from 'toolkitStore/actions/authors';

export const fetchAllOrders = (params: AxiosRequestConfig<IOrderParams>) => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getOrdersRequest());
    try {
      const { data } = await getAllOrders({ params });
      dispatch(getOrdersSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getOrdersFailure(message));
    }
  };
};

export const fetchAllGames = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getAllGamesRequest());
    try {
      const { data } = await fetchGames();
      dispatch(getAllGamesSuccess(data.rows));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getAllGamesFailure(message));
    }
  };
};

export const fetchAllDiscounts = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getDiscountsRequest());
    try {
      const { data } = await getDiscounts();
      dispatch(getDiscountsSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getDiscountsFailure(message));
    }
  };
};

export const getAllAuthors = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getAllAuthorsRequest());
    try {
      const { data } = await fetchAllAuthors();
      dispatch(getAllAuthorsSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getAllAuthorsFailure(message));
    }
  };
};

export const fetchAllUsers = () => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(getUsersRequest());
    try {
      const { data } = await getAllUsers();
      dispatch(getUsersSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(getUsersFailure(message));
    }
  };
};

export const blockCurrentUser = (params: AxiosRequestConfig<IUserParams>) => {
  return async (dispatch: (arg0: { payload?: AdminPanelState; type: string }) => void) => {
    dispatch(blockUserRequest());
    try {
      const { data } = await blockUser(params);
      dispatch(blockUserSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(blockUserFailure(message));
    }
  };
};

export const addNewGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(addNewGameRequest(params));
    try {
      const { data } = await createNewGame(params);
      dispatch(addNewGameSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addNewGameFailure(message));
    }
  };
};

export const updateSelectedGame = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(updateGameRequest(params));
    try {
      const { data } = await updateGame(params);
      dispatch(updateGameSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(updateGameFailure(message));
    }
  };
};

export const addNewAuthor = (params: INewAuthorParams) => {
  return async (dispatch: (arg0: { payload: INewAuthorParams; type: string }) => void) => {
    dispatch(addNewAuthorRequest(params));
    try {
      const { data } = await createNewAuthor(params);
      dispatch(addNewAuthorSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addNewAuthorFailure(message));
    }
  };
};

export const updateSelectedAuthor = (params: INewGameParams) => {
  return async (dispatch: (arg0: { payload: INewGameParams; type: string }) => void) => {
    dispatch(updateAuthorRequest(params));
    try {
      const { data } = await updateAuthor(params);
      dispatch(updateAuthorSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(updateAuthorFailure(message));
    }
  };
};

export const addDiscounts = (params: IDiscountParams) => {
  return async (dispatch: (arg0: { payload: IDiscountParams; type: string }) => void) => {
    dispatch(addDiscountsRequest(params));
    try {
      const { data } = await createDiscounts(params);
      dispatch(addDiscountsSuccess(data));
    } catch ({
      response: {
        data: { message },
      },
    }) {
      dispatch(addDiscountsFailure(message));
    }
  };
};

import { authInstance } from 'api';
import axios, { AxiosRequestConfig } from 'axios';

import {
  IDiscountParams,
  INewAuthorParams,
  INewGameParams,
  IOrderParams,
  IUserParams,
} from 'types/interfaces';

export const uploadGamePhoto = (formData: FormData) => {
  return axios.post('https://api.cloudinary.com/v1_1/game-shop/image/upload', formData);
};

export const getAllOrders = ({
  params,
}: AxiosRequestConfig<IOrderParams | AxiosRequestConfig<IOrderParams> | undefined>) => {
  return authInstance.get('https://outcst-game-shop-server.herokuapp.com/api/order/admin', params);
};

export const createNewGame = (params: INewGameParams) => {
  return authInstance.post('https://outcst-game-shop-server.herokuapp.com/api/game/', params);
};

export const updateGame = (params: INewGameParams) => {
  return authInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/game/${params.id}`,
    params,
  );
};

export const updateAuthor = (params: INewAuthorParams) => {
  return authInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/author/${params.id}`,
    params,
  );
};

export const createNewAuthor = (params: INewAuthorParams) => {
  return authInstance.post('https://outcst-game-shop-server.herokuapp.com/api/author/', params);
};

export const getDiscounts = () => {
  return authInstance.get('https://outcst-game-shop-server.herokuapp.com/api/discount/');
};

export const deleteDiscounts = () => {
  return authInstance.delete('https://outcst-game-shop-server.herokuapp.com/api/discount/');
};

export const createDiscounts = (params: IDiscountParams) => {
  return authInstance.post('https://outcst-game-shop-server.herokuapp.com/api/discount/', params);
};

export const getAllUsers = () => {
  return authInstance.get('https://outcst-game-shop-server.herokuapp.com/api/user');
};

export const blockUser = ({ params }: AxiosRequestConfig<IUserParams>) => {
  return authInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/user/block/${params.id}`,
    params,
  );
};

export const deleteGame = (id: number) => {
  return authInstance.delete(`https://outcst-game-shop-server.herokuapp.com/api/game/${id}`);
};

export const deleteAuthor = (id: number) => {
  return authInstance.delete(`https://outcst-game-shop-server.herokuapp.com/api/author/${id}`);
};

export const deleteDiscount = (id: number) => {
  return authInstance.delete(`https://outcst-game-shop-server.herokuapp.com/api/discount/${id}`);
};

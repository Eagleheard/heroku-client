import { authInstance } from 'api';
import { AxiosRequestConfig } from 'axios';

import { IOrder } from 'types/interfaces';

export const fetchOrders = (params: AxiosRequestConfig<IOrder>) => {
  return authInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/order/user/`, params);
};

export const createOrder = (params: IOrder) => {
  return authInstance.post(`https://outcst-game-shop-server.herokuapp.com/api/order/`, params);
};

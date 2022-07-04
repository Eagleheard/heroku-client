import { authInstance, guestInstance } from 'api';

import { IUser } from './../types/interfaces';

export const registration = (params: IUser) => {
  return guestInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/user/signup`,
    params,
    {
      withCredentials: true,
    },
  );
};

export const login = (params?: IUser) => {
  return guestInstance.put(`https://outcst-game-shop-server.herokuapp.com/api/user/login`, params);
};

export const authorization = () => {
  return authInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/user/auth`);
};

export const logout = () => {
  return authInstance.put('https://outcst-game-shop-server.herokuapp.com/api/user/logout');
};

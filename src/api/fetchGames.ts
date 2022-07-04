import { guestInstance } from 'api';
import { AxiosRequestConfig } from 'axios';

import { IParams } from 'types/interfaces';

export const fetchGames = (page?: number, limit?: number, params?: AxiosRequestConfig<IParams>) => {
  return guestInstance.get(
    `https://outcst-game-shop-server.herokuapp.com/api/game?page=${page}&limit=${limit}`,
    params,
  );
};

import { authInstance, guestInstance } from 'api';

import { ICommentParams } from 'types/interfaces';

export const fetchGame = (id?: string) => {
  return guestInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/game/${id}`);
};

export const fetchGameComments = (id: number, page: number, limit: number) => {
  return authInstance.get(
    `https://outcst-game-shop-server.herokuapp.com/api/comments/${id}/?page=${page}&limit=${limit}`,
  );
};

export const sendComment = (params: ICommentParams) => {
  return authInstance.post(
    `https://outcst-game-shop-server.herokuapp.com/api/comments/${params.id}`,
    params,
  );
};

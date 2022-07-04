import { guestInstance } from 'api';

export const fetchGameByAuthor = (id?: string) => {
  return guestInstance.get(
    `https://outcst-game-shop-server.herokuapp.com/api/game/?authorId=${id}`,
  );
};

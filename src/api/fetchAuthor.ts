import { guestInstance, authInstance } from 'api';

export const fetchAuthor = (id?: string) => {
  return guestInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/author/${id}`);
};

export const fetchAllAuthors = () => {
  return guestInstance.get('https://outcst-game-shop-server.herokuapp.com/api/author/');
};

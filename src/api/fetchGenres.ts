import { guestInstance } from 'api';

export const fetchGenres = () => {
  return guestInstance.get('https://outcst-game-shop-server.herokuapp.com/api/genre');
};

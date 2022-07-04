import { guestInstance } from 'api';

export const fetchPopularGames = () => {
  return guestInstance.get(
    'https://outcst-game-shop-server.herokuapp.com/api/game?order=popularity',
  );
};

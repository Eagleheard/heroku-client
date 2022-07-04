import { guestInstance } from 'api';

export const fetchNewGames = () => {
  return guestInstance.get('https://outcst-game-shop-server.herokuapp.com/api/game/?isNew=true');
};

import { guestInstance } from 'api';

export const fetchPreviewGames = () => {
  return guestInstance.get('https://outcst-game-shop-server.herokuapp.com/api/game?isPreview=true');
};

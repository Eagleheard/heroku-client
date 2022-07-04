import { authInstance } from 'api';

import { IAchievement } from 'types/interfaces';

export const fetchAchievement = () => {
  return authInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/achievement/`);
};

export const claimAchieve = (params: IAchievement) => {
  return authInstance.put(`https://outcst-game-shop-server.herokuapp.com/api/achievement/`, params);
};

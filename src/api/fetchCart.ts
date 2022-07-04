import { authInstance } from 'api';

interface ICart {
  gameId?: number;
  value?: number;
}

export const getBasket = () => {
  return authInstance.get(`https://outcst-game-shop-server.herokuapp.com/api/basket`);
};

export const addGameToBasket = ({ gameId, value }: ICart) => {
  return authInstance.post(
    `https://outcst-game-shop-server.herokuapp.com/api/basket?gameId=${gameId}&value=${value}`,
  );
};

export const decrementGameFromBasket = ({ gameId }: ICart) => {
  return authInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/basket/decrement?gameId=${gameId}`,
  );
};

export const incrementGameToBasket = ({ gameId }: ICart) => {
  return authInstance.put(
    `https://outcst-game-shop-server.herokuapp.com/api/basket/increment?gameId=${gameId}`,
  );
};

export const removeGameFromBasket = ({ gameId }: ICart) => {
  return authInstance.delete(`https://outcst-game-shop-server.herokuapp.com/api/basket/${gameId}`);
};

export const clearBasket = () => {
  return authInstance.delete(`https://outcst-game-shop-server.herokuapp.com/api/basket/`);
};

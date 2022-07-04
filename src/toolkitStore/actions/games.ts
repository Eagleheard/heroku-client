import { gamesSlice } from 'toolkitStore/slices/games';

export const {
  addNewGameRequest,
  addNewGameSuccess,
  addNewGameFailure,
  addNewGameSaveOptionts,
  updateGameRequest,
  updateGameFailure,
  updateGameSuccess,
  getAllGamesRequest,
  getAllGamesSuccess,
  getAllGamesFailure,
  updateGameSaveOptionts,
  setSelectedGame,
  resetSelectedGame,
  resetGame,
  resetUpdatedGame,
} = gamesSlice.actions;

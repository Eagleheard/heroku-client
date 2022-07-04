import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [
    {
      id: 0,
      name: null,
      price: null,
      count: 0,
      disk: false,
      digital: false,
      popularity: 0,
      image: '',
      description: '',
      isNew: false,
      isPreview: false,
      preview: '',
      genreId: 0,
      genre: {
        id: 0,
        name: '',
      },
      authorId: 0,
      author: {
        id: 0,
        name: '',
      },
    },
  ],
  newGame: {
    name: null,
    price: null,
    count: 0,
    disk: false,
    digital: false,
    popularity: 0,
    image: '',
    description: '',
    isNew: false,
    isPreview: false,
    preview: '',
    genreId: 0,
    genre: {
      id: 0,
      name: '',
    },
    authorId: 0,
    author: {
      id: 0,
      name: '',
    },
  },
  updateGame: {
    name: null,
    price: null,
    count: 0,
    disk: false,
    digital: false,
    popularity: 0,
    image: '',
    description: '',
    isNew: false,
    isPreview: false,
    preview: '',
    genreId: 0,
    genre: {
      id: 0,
      name: '',
    },
    authorId: 0,
    author: {
      id: 0,
      name: '',
    },
  },
  selectedGame: null,
  isLoading: false,
  gameError: '',
};

export const gamesSlice = createSlice({
  name: 'gamesReducer',
  initialState,
  reducers: {
    addNewGameRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newGame = payload;
    },
    addNewGameSaveOptionts: (state, { payload }) => {
      const newGame = { ...payload };
      state.newGame = newGame;
    },
    addNewGameSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newGame = payload;
      state.gameError = '';
    },
    addNewGameFailure: (state, { payload }) => {
      state.isLoading = false;
      state.gameError = payload;
    },
    updateGameRequest: (state, { payload }) => {
      state.isLoading = true;
      state.updateGame = payload;
    },
    updateGameSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.updateGame = payload;
      state.gameError = '';
    },
    updateGameSaveOptionts: (state, { payload }) => {
      const updatedGame = { ...payload };
      state.updateGame = updatedGame;
    },
    updateGameFailure: (state, { payload }) => {
      state.isLoading = false;
      state.gameError = payload;
    },
    getAllGamesRequest: (state) => {
      state.isLoading = true;
    },
    getAllGamesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.games = payload;
    },
    getAllGamesFailure: (state, { payload }) => {
      state.isLoading = false;
      state.gameError = payload;
    },
    setSelectedGame: (state, { payload }) => {
      state.selectedGame = payload;
    },
    resetSelectedGame: (state) => {
      state.selectedGame = initialState.selectedGame;
    },
    resetGame: (state) => {
      state.newGame = initialState.newGame;
    },
    resetUpdatedGame: (state) => {
      state.updateGame = initialState.updateGame;
    },
  },
});

export default gamesSlice.reducer;

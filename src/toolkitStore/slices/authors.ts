import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authors: [
    {
      id: 0,
      name: '',
      image: '',
      location: '',
      description: '',
      popularity: 0,
    },
  ],
  selectedAuthor: null,
  newAuthor: {
    id: null,
    name: '',
    image: '',
    location: '',
    description: '',
    popularity: null,
  },
  updatedAuthor: {
    name: '',
    image: '',
    location: '',
    description: '',
    popularity: 0,
  },
  isLoading: false,
  authorError: '',
};

export const authorsSlice = createSlice({
  name: 'authorsReducer',
  initialState,
  reducers: {
    addNewAuthorRequest: (state, { payload }) => {
      state.isLoading = true;
      state.newAuthor = payload;
    },
    addNewAuthorSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.newAuthor = payload;
      state.authorError = '';
    },
    addNewAuthorSaveOptionts: (state, { payload }) => {
      const newAuthor = { ...payload };
      state.newAuthor = newAuthor;
    },
    addNewAuthorFailure: (state, { payload }) => {
      state.isLoading = false;
      state.authorError = payload;
    },
    updateAuthorRequest: (state, { payload }) => {
      state.isLoading = true;
      state.updatedAuthor = payload;
    },
    updateAuthorSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.updatedAuthor = payload;
      state.authorError = '';
    },
    updateAuthorSaveOptionts: (state, { payload }) => {
      const updatedAuthor = { ...payload };
      state.updatedAuthor = updatedAuthor;
    },
    updateAuthorFailure: (state, { payload }) => {
      state.isLoading = false;
      state.authorError = payload;
    },
    setSelectedAuthor: (state, { payload }) => {
      state.selectedAuthor = payload;
    },
    resetSelectedAuthor: (state) => {
      state.selectedAuthor = initialState.selectedAuthor;
    },
    resetNewAuthor: (state) => {
      state.newAuthor = initialState.newAuthor;
    },
    resetUpdatedAuthor: (state) => {
      state.updatedAuthor = initialState.updatedAuthor;
    },
    getAllAuthorsRequest: (state) => {
      state.isLoading = true;
    },
    getAllAuthorsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.authors = payload;
    },
    getAllAuthorsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.authorError = payload;
    },
  },
});

export default authorsSlice.reducer;
export const { addNewAuthorRequest, addNewAuthorSuccess, addNewAuthorFailure } =
  authorsSlice.actions;

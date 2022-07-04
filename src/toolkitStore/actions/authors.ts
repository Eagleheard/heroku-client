import { authorsSlice } from 'toolkitStore/slices/authors';

export const {
  addNewAuthorRequest,
  addNewAuthorSuccess,
  addNewAuthorFailure,
  addNewAuthorSaveOptionts,
  updateAuthorRequest,
  updateAuthorSuccess,
  updateAuthorFailure,
  updateAuthorSaveOptionts,
  getAllAuthorsRequest,
  getAllAuthorsSuccess,
  getAllAuthorsFailure,
  setSelectedAuthor,
  resetSelectedAuthor,
  resetNewAuthor,
  resetUpdatedAuthor,
} = authorsSlice.actions;

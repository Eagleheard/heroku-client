import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  IconButton,
  Button,
} from '@mui/material';

import { Edit, Delete, Clear, AddBox, FiberNew, Discount } from '@mui/icons-material';

import {
  resetSelectedAuthor,
  setSelectedAuthor,
  updateAuthorRequest,
} from 'toolkitStore/actions/authors';
import { AuthorsReducerState, GamesReducerState } from 'toolkitStore/types';
import { fetchAllGames, getAllAuthors } from 'toolkitStore/thunk';
import { resetSelectedGame, setSelectedGame, updateGameRequest } from 'toolkitStore/actions/games';
import { ToastOptions } from 'types/enumerators';
import { IAuthor, IGame } from 'types/interfaces';
import { deleteGame, deleteAuthor } from 'api/adminRequests';
import { useToast } from 'hooks';
import {
  Autocomplete,
  ConfirmDialog,
  Loader,
  ToastComponent,
  TablePaginationButtons,
  Portal,
} from 'components';

import './styles.scss';

interface ITable {
  authorMode?: boolean;
}

export const InfoTable: React.FC<ITable> = ({ authorMode }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const dispatch = useDispatch();
  const { selectedGame } = useSelector((state: GamesReducerState) => state.gamesReducer || []);
  const { openToast } = useToast();
  const { games, gameError, isLoading } = useSelector(
    (state: GamesReducerState) => state.gamesReducer || [],
  );
  const { authors, authorError, selectedAuthor } = useSelector(
    (state: AuthorsReducerState) => state.authorsReducer || [],
  );
  const tableType = authorMode ? authors : games;
  const handleDeleteItem = async (id: number) => {
    try {
      if (!authorMode) {
        await deleteGame(id);
        dispatch(fetchAllGames());
      }
      if (authorMode) {
        await deleteAuthor(id);
        dispatch(getAllAuthors());
      }
      setIsConfirmVisible(false);
      openToast('Successfully deleted', ToastOptions.success);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const handleOpenConfirm = (id: number) => {
    setIsConfirmVisible(true);
    setDeletedItemId(id);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableType.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectItem = (input: string) => {
    if (authorMode) {
      const author = authors.filter(({ name }) => name === input);
      dispatch(setSelectedAuthor(author));
    }
    if (!authorMode) {
      const game = games.filter(({ name }) => name === input);
      dispatch(setSelectedGame(game));
    }
    setPage(0);
  };

  const handleEditItem = (game: IGame | IAuthor) => {
    if (authorMode) {
      dispatch(updateAuthorRequest(game));
    }
    if (!authorMode) {
      dispatch(updateGameRequest(game));
    }
  };

  const handleReset = () => {
    if (!authorMode) {
      dispatch(fetchAllGames());
      dispatch(resetSelectedGame());
    }
    if (authorMode) {
      dispatch(getAllAuthors());
      dispatch(resetSelectedAuthor());
    }
  };

  useEffect(() => {
    if (!authorMode) {
      dispatch(fetchAllGames());
      dispatch(resetSelectedGame());
    }
    if (authorMode) {
      dispatch(getAllAuthors());
      dispatch(resetSelectedAuthor());
    }
    if ((authorError || gameError) && !isLoading) {
      openToast('Something wrong', ToastOptions.error);
    }
  }, []);

  return (
    <>
      <div className="table__menu">
        <h1>{authorMode ? 'All authors' : 'All games'}</h1>
        <IconButton aria-label="menu" onClick={() => setIsMenuVisible((prevValue) => !prevValue)}>
          <AddBox />
        </IconButton>
        {isMenuVisible && (
          <div>
            <Button color="inherit" startIcon={<FiberNew />}>
              <NavLink
                className="admin__link"
                to={`/admin/${authorMode ? 'new-author' : 'new-game'}`}
              >
                {authorMode ? 'New author' : 'New game'}
              </NavLink>
            </Button>
            {!authorMode && (
              <Button color="inherit" startIcon={<Discount />}>
                <NavLink className="admin__link" to="/admin/discount">
                  Discount
                </NavLink>
              </Button>
            )}
          </div>
        )}
      </div>
      {tableType && !isLoading ? (
        <TableContainer className="table" component={Paper}>
          <Clear className="table__close-btn" onClick={handleReset} />
          <Autocomplete
            options={tableType.map(({ name }) => name)}
            name={authorMode ? 'Author' : 'Game'}
            onChangeInput={handleSelectItem}
          />
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 160 }} align="center">
                  Name
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {authorMode ? 'Location' : 'Author'}
                </TableCell>
                <TableCell style={{ width: authorMode ? 320 : 160 }} align="center">
                  {authorMode ? 'Description' : 'Genre'}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {authorMode ? 'Popularity' : 'Price'}
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  Edit
                </TableCell>
                <TableCell style={{ width: 40 }} align="center">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0 && !authorMode
                ? selectedGame || games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : selectedAuthor ||
                  authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell style={{ width: 160 }} align="center">
                    {authorMode ? item.name : item.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {authorMode ? item.location : item.author.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {authorMode ? item.description : item.genre.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {authorMode ? item.popularity : item.price + '$'}
                  </TableCell>
                  <TableCell className="table__cell" style={{ width: 40 }} align="center">
                    <NavLink
                      className="admin__button"
                      to={`/admin/${authorMode ? 'update-author' : 'update-game'}`}
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="table__cell--icon" />
                    </NavLink>
                  </TableCell>
                  <TableCell className="table__cell" style={{ width: 40 }} align="center">
                    <Delete
                      className="table__cell--icon"
                      onClick={() => handleOpenConfirm(item.id)}
                    />
                  </TableCell>
                  {isConfirmVisible && (
                    <Portal
                      Component={() => (
                        <ConfirmDialog
                          confirmDeleting={() => handleDeleteItem(deletedItemId)}
                          handleClose={() => setIsConfirmVisible(false)}
                        />
                      )}
                      style="admin-panel"
                      isOpen={isConfirmVisible}
                      text={authorMode ? 'Delete selected author?' : 'Delete selected game?'}
                      handleClose={() => setIsConfirmVisible(false)}
                    />
                  )}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={tableType.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'games per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationButtons}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Loader />
      )}
      <ToastComponent />
    </>
  );
};

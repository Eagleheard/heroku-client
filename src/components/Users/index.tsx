import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { useGetUsersQuery } from 'toolkitStore/thunk/rtkQuery';
import { blockCurrentUser } from 'toolkitStore/thunk';
import { IUser, IUserParams } from 'types/interfaces';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { ToastComponent, Loader, TablePaginationButtons } from 'components';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import userImg from 'assets/userPhoto.png';

import './styles.scss';

export const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data = [], error, isLoading, refetch } = useGetUsersQuery('user');

  const dispatch = useDispatch();
  const { openToast } = useToast();

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlockUser = (user: IUserParams) => {
    dispatch(
      blockCurrentUser({
        params: {
          id: user.id,
          blocked: !user.blocked,
        },
      }),
    );
    refetch();
  };

  useEffect(() => {
    if (error && !isLoading) {
      openToast(error, ToastOptions.error);
    }
  }, []);

  return (
    <>
      <h1>Users</h1>
      {!isLoading ? (
        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 160 }} align="center">
                  Photo
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Name
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Last name
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  Email
                </TableCell>
                <TableCell style={{ width: 80 }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((user: IUser) => (
                <TableRow key={user.id}>
                  <TableCell style={{ width: 160 }} align="center">
                    <img
                      className="users__photo"
                      width={50}
                      src={user.photo ? user.photo : userImg}
                    />
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {user.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {user.lastName}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {user.email}
                  </TableCell>
                  <TableCell style={{ width: 80 }} align="center">
                    <p
                      onClick={() => handleBlockUser(user)}
                      className={classNames('users__status', {
                        'users__status--active': !user.blocked,
                        'users__status--blocked': user.blocked,
                      })}
                    >
                      {user.blocked ? 'Blocked' : 'Active'}
                    </p>
                  </TableCell>
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
                  count={data.length}
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

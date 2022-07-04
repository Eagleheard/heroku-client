import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      photo: '',
      blocked: false,
    },
  ],
  isLoading: false,
  usersError: '',
};

export const usersSlice = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {
    getUsersRequest: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
      state.usersError = '';
    },
    getUsersFailure: (state, { payload }) => {
      state.isLoading = false;
      state.usersError = payload;
    },
    blockUserRequest: (state) => {
      state.isLoading = true;
    },
    blockUserSuccess: (state, { payload }) => {
      state.users
        .filter((user) => user.id === payload.id)
        .map((user) => user.blocked === payload.blocked);
      state.isLoading = false;
      state.usersError = '';
    },
    blockUserFailure: (state, { payload }) => {
      state.isLoading = false;
      state.usersError = payload;
    },
  },
});

export default usersSlice.reducer;

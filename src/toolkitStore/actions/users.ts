import { usersSlice } from 'toolkitStore/slices/users';

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  blockUserRequest,
  blockUserSuccess,
  blockUserFailure,
} = usersSlice.actions;

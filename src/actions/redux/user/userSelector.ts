import { createSelector } from '@reduxjs/toolkit';

const selectUserReducer = (state: any) => state;

export const selectUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.user
);

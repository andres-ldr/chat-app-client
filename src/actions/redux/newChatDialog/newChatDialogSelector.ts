import { createSelector } from '@reduxjs/toolkit';

const selectNewChatDialogReducer = (state: any) => state;

export const selectNewChatDialog = createSelector(
  [selectNewChatDialogReducer],
  (newChatDialogSlice) => newChatDialogSlice.newChatDialog
);

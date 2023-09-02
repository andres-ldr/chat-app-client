import { createSelector } from '@reduxjs/toolkit';

const selectChatReducer = (state: any) => state;

export const selectChat = createSelector(
  [selectChatReducer],
  (chatSlice) => chatSlice.chat
);

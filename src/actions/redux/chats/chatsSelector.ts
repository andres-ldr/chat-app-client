import { createSelector } from '@reduxjs/toolkit';

const selectChatsReducer = (state: any) => state;

export const selectChats = createSelector(
  [selectChatsReducer],
  (chatsSlice) => chatsSlice.chats
);

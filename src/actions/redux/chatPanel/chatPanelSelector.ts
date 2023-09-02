import { createSelector } from '@reduxjs/toolkit';

const selectChatPanelReducer = (state: any) => state;

export const selectChatPanel = createSelector(
  [selectChatPanelReducer],
  (chatPanelSlice) => chatPanelSlice.chatPanel
);

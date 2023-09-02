import { createSlice } from '@reduxjs/toolkit';

export const chatPanelSlice = createSlice({
  name: 'chatPanelSlice',
  initialState: false,
  reducers: {
    toggleChatPanel: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleChatPanel } = chatPanelSlice.actions;

export const chatPanelReducer = chatPanelSlice.reducer;

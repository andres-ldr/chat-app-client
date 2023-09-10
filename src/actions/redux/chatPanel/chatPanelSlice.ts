import { createSlice } from '@reduxjs/toolkit';

export const chatPanelSlice = createSlice({
  name: 'chatPanelSlice',
  initialState: { active: false },
  reducers: {
    toggleChatPanel: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { toggleChatPanel } = chatPanelSlice.actions;

export const chatPanelReducer = chatPanelSlice.reducer;

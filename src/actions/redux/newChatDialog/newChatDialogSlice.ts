import { createSlice } from '@reduxjs/toolkit';

export const newChatDialogSlice = createSlice({
  name: 'newChatDialog',
  initialState: { active: false },
  reducers: {
    toggleNewChatDialog: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { toggleNewChatDialog } = newChatDialogSlice.actions;

export const newChatDialogReducer = newChatDialogSlice.reducer;

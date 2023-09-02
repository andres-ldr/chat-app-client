import { createSlice } from '@reduxjs/toolkit';

export const newChatDialogSlice = createSlice({
  name: 'newChatDialog',
  initialState: false,
  reducers: {
    toggleNewChatDialog: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { toggleNewChatDialog } = newChatDialogSlice.actions;

export const newChatDialogReducer = newChatDialogSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const contactSectionSlice = createSlice({
  name: 'contactSection',
  initialState: false,
  reducers: {
    toggleContactSection: (state, action) => (state = action.payload),
  },
});

export const { toggleContactSection } = contactSectionSlice.actions;

export const contactSectionReducer = contactSectionSlice.reducer;

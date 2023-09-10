import { createSlice } from '@reduxjs/toolkit';

export const contactSectionSlice = createSlice({
  name: 'contactSection',
  initialState: { active: false },
  reducers: {
    toggleContactSection: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { toggleContactSection } = contactSectionSlice.actions;

export const contactSectionReducer = contactSectionSlice.reducer;

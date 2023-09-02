import { createSelector } from '@reduxjs/toolkit';

const selectContactSectionReducer = (state: any) => state;

export const selectContactSection = createSelector(
  [selectContactSectionReducer],
  (contactSectionSlice) => contactSectionSlice.contactSection
);

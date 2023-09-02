import { createSelector } from '@reduxjs/toolkit';

const selectContactsReducer = (state: any) => state;

export const selectContacts = createSelector(
  [selectContactsReducer],
  (contactsSlice) => contactsSlice.contacts
);

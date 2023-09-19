import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(
      'http://localhost:8000/v1/users/contacts',
      { withCredentials: true }
    );

    return response.data;
  }
);

interface INewContact {
  alias: string;
  email: string;
}

export const postNewContact = createAsyncThunk(
  'contacts/postNewContact',
  async (newContact: INewContact) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}v1/users/new_contact`,
      {
        alias: newContact.alias,
        email: newContact.email,
      },
      { withCredentials: true }
    );

    return response.data;
  }
);

export const INITIAL_STATE_CONTACTS: {
  contacts: any[];
  isLoading: boolean;
  error: null | string | undefined;
} = {
  contacts: [],
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE_CONTACTS,
  reducers: {
    clearContactsOnLogOut: (state) => {
      state.isLoading = false;
      state.contacts = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContacts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(postNewContact.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postNewContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts.push(action.payload);
    });
    builder.addCase(postNewContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearContactsOnLogOut } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

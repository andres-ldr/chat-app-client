import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface ICredentials {
  email: string;
  password: string;
}

export const postLogIn = createAsyncThunk(
  'user/postLogIn',
  async (credentials: ICredentials) => {
    const response = await axios.post(
      'http://localhost:8000/v1/users/login',
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        withCredentials: true,
      }
    );
    const { uid, name, lastName, email, profileImage } = await response.data;
    const user = { uid, name, lastName, email, profileImage };

    return user;
  }
);
export const postLogOut = createAsyncThunk('user/postLogOut', async () => {
  const response = await axios.delete('http://localhost:8000/v1/users/logout', {
    withCredentials: true,
  });
  //return null;
});

export const INITIAL_STATE_USER: {
  user: {
    uid: string;
    name: string;
    lastName: string;
    email: string;
    profileImage: string;
  } | null;
  isLoading: boolean;
  error: null | string | undefined;
} = {
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE_USER,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(postLogIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postLogIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(postLogIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(postLogOut.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postLogOut.fulfilled, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(postLogOut.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const userReducer = userSlice.reducer;

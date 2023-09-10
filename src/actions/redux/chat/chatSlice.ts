import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface IFetchChat {
  alias: string | null;
  members: { email: string }[];
}

export const fetchChatWithAContact = createAsyncThunk(
  'chat/chat_by_members',
  async ({ members }: IFetchChat) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}v1/users/chat_by_members`,
      { alias: null, members, adminId: [], chatImage: null },
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const fetchChatById = createAsyncThunk(
  'chat/fetchChatById',
  async ({ cid }: { cid: string }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}v1/users/chatById`,
      { cid },
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

interface IPostMsg {
  cid: string;
  content: string;
  type: string;
}

export const postMsg = createAsyncThunk(
  'chat/postNewMsg',
  async ({ cid, content, type }: IPostMsg) => {
    const response = await axios.post(
      'http://localhost:8000/v1/users/send_msg',
      { cid, content, type },
      { withCredentials: true }
    );

    return response.data;
  }
);

export const INITIAL_STATE_CHAT: {
  cid: string | null;
  chat: any[];
  alias: string | null;
  chatImage: string | null;
  isLoading: boolean;
  error: null | string | undefined;
} = {
  cid: null,
  chat: [],
  alias: null,
  chatImage: null,
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: INITIAL_STATE_CHAT,
  reducers: {
    clearChatOnLogOut: (state) => {
      state.isLoading = false;
      state.cid = null;
      state.chat = [];
      state.alias = null;
      state.chatImage = null;
      state.error = null;
    },
    addMsg: (state, action) => {
      state.chat.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchChatWithAContact.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChatWithAContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cid = action.payload.cid;
      state.chat = action.payload.chat;
      state.alias = action.payload.alias;
      state.chatImage = action.payload.chatImage;
    });
    builder.addCase(fetchChatWithAContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchChatById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchChatById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cid = action.payload.cid;
      state.chat = action.payload.chat;
      state.alias = action.payload.alias;
      state.chatImage = action.payload.chatImage;
    });
    builder.addCase(fetchChatById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(postMsg.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postMsg.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat.push(action.payload);
    });
    builder.addCase(postMsg.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearChatOnLogOut, addMsg } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

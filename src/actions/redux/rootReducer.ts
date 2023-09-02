import { contactSectionReducer } from './contactSection/contactSectionSlice';
import { newChatDialogReducer } from './newChatDialog/newChatDialogSlice';
import { chatPanelReducer } from './chatPanel/chatPanelSlice';
import { messagesReducer } from './messages/messagesSlice';
import { contactsReducer } from './contact/contactsSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice';
import { chatReducer } from './chat/chatSlice';
import { chatsReducer } from './chats/chatsSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  chats: chatsReducer,
  chat: chatReducer,
  newChatDialog: newChatDialogReducer,
  chatPanel: chatPanelReducer,
  // contactSection: contactSectionReducer,
  // messages: messagesReducer,
});

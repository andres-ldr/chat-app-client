import axios from 'axios';
import { User } from '../types/user';
import { Contact } from '../types/contact';
import { Chat } from '../types/chat';

const baseURL = 'http://localhost:8000'; // use .env
const axiosInstance = axios.create({ baseURL, withCredentials: true });

export const login = async (data: { email: string; password: string }) => {
  return await axiosInstance.post<User>('/v1/login', data);
};

export const createUser = async (data: FormData) => {
  return await axiosInstance.post<User>('/v1/users/new', data);
};

export const getUserByEmail = async (data: { email: string }) => {
  return (await axiosInstance.post<User[]>('/v1/users/get', data)).data;
};

export const logOut = async () => {
  return await axiosInstance.delete('/v1/logout');
};

export const getContacts = async () => {
  return (await axiosInstance.get<Contact[]>('/v1/contacts')).data;
};

export const createContact = async (data: { alias: string; email: string }) => {
  return await axiosInstance.post<Contact>('/v1/contacts/new', data);
};

export const deleteContact = async (data: { contactId: string }) => {
  return await axiosInstance.delete<Contact>('/v1/contacts/delete', { data });
};

export const updateContact = async (data: Contact) => {
  return await axiosInstance.patch<Contact>('/v1/contacts/update', data);
};

export const getChats = async () => {
  return (await axiosInstance.get<Chat[]>('/v1/chats')).data;
};

export const postChat = async (data: { members: string[] }) => {
  return await axiosInstance.post<Chat>('/v1/chats/new', data);
};

export const deleteChat = async (data: { cid: string }) => {
  return await axiosInstance.delete<Chat>('/v1/chats/delete', { data });
};

export const createChatGroup = async (data: any) => {
  return await axiosInstance.post<Chat>('/v1/chats/groups/new', data);
};
export const updateChatGroup = async (data: any) => {
  return await axiosInstance.put<Chat>('/v1/chats/groups/update', data);
};

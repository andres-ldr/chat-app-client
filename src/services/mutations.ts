import { useMutation } from '@tanstack/react-query';
import {
  createChatGroup,
  createContact,
  createUser,
  deleteChat,
  deleteContact,
  getUserByEmail,
  login,
  logOut,
  postChat,
  updateChatGroup,
  updateContact,
} from './api';
import { Contact } from '../types/contact';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: { email: string; password: string }) => login(data),
  });
};

export const useLogOut = () => {
  return useMutation({
    mutationKey: ['logOut'],
    mutationFn: () => logOut(),
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: (data: FormData) => createUser(data),
  });
};

export const useUser = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: (data: { email: string }) => getUserByEmail(data),
  });
};

export const useCreateContact = () => {
  return useMutation({
    mutationKey: ['createContact'],
    mutationFn: (data: { alias: string; email: string }) => createContact(data),
  });
};

export const useDeleteContact = () => {
  return useMutation({
    mutationKey: ['deleteContact'],
    mutationFn: (data: { contactId: string }) => deleteContact(data),
  });
};

export const useUpdateContact = () => {
  return useMutation({
    mutationKey: ['updateContact'],
    mutationFn: (data: Contact) => updateContact(data),
  });
};

export const usePostChat = () => {
  return useMutation({
    mutationKey: ['postChat'],
    mutationFn: (data: { members: string[] }) => postChat(data),
  });
};

export const useDeleteChat = () => {
  return useMutation({
    mutationKey: ['deleteChat'],
    mutationFn: (data: { cid: string }) => deleteChat(data),
  });
};

export const useCreateChatGroup = () => {
  return useMutation({
    mutationKey: ['createChatGroup'],
    mutationFn: (data: any) => createChatGroup(data),
  });
};
export const useUpdateChatGroup = () => {
  return useMutation({
    mutationKey: ['createChatGroup'],
    mutationFn: (data: any) => updateChatGroup(data),
  });
};

import { useQuery } from '@tanstack/react-query';
import { getChats, getContacts } from './api';



export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
    refetchOnMount: true,
  });
};

export const useChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
    refetchOnMount: true,
  });
};

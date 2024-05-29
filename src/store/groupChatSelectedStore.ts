import { create } from 'zustand';
import { Chat } from '../types/chat';

type GroupChatSelectedStore = {
  groupChat: Chat | null;
  setGroupChat: (groupChat: Chat) => void;
  cleanGroupChat: () => void;
};

export const useGroupChatSelectedStore = create<GroupChatSelectedStore>()(
  (set) => ({
    groupChat: null,
    setGroupChat: (groupChat) => set({ groupChat: groupChat }),
    cleanGroupChat: () => set({ groupChat: null }),
  })
);

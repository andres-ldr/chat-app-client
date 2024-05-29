import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Chat } from '../types/chat';

type ChatStore = {
  chat: Chat | null;
  setChat: (chat: Chat) => void;
  deleteChat: () => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chat: null,
      setChat: (chat) => set({ chat }),
      deleteChat: () => set({ chat: null }),
    }),
    {
      name: 'chat-storage',
    }
  )
);

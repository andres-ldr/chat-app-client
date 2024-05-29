import { create } from 'zustand';
import { Message } from '../types/message';

type MessageSelectedStore = {
  message: Message | null;
  setMessage: (message: Message) => void;
  cleanMessage: () => void;
};

export const useMessageSelectedStore = create<MessageSelectedStore>()(
  (set) => ({
    message: null,
    setMessage: (message) => set({ message }),
    cleanMessage: () => set({ message: null }),
  })
);

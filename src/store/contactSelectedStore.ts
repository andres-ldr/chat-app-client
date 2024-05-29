import { create } from 'zustand';
import { Contact } from '../types/contact';

type ContactSelectedStore = {
  contact: Contact | null;
  setContact: (contact: Contact) => void;
  cleanContact: () => void;
};

export const useContactSelectedStore = create<ContactSelectedStore>()((set) => ({
  contact: null,
  setContact: (contact) => set({ contact }),
  cleanContact: () => set({ contact: null }),
}));

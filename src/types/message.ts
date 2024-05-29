import { User } from './user';

export interface Message {
  mid: string;
  chatId: string;
  content: string;
  type: string;
  creationDate: Date;
  senderId: string;
  sender: User;
}

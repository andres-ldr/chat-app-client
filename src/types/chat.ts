import { Message } from './message';
import { User } from './user';

export interface Chat {
  cid: string;
  alias: string;
  members: User[];
  messages: Message[];
  isGroup: boolean;
  chatImage: string;
  admins: User[];
}

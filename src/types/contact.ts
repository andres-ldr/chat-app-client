import { User } from './user';

export interface Contact {
  contactId: string;
  alias: string;
  email: string;
  user: User;
}

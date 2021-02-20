import {Class} from '../classes/class';
import {Grade} from '../grade/grade';
import {User} from '../user/user';

export interface Message {
  id?: number;
  name?: string;
  content?: string;
  status?: 0 | 1;
  user_id?: number;
  user?: User;
  author_id?: number;
  author?: User;
  created_at?: string;
}

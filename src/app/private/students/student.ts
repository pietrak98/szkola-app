import {Class} from '../classes/class';
import {Grade} from '../grade/grade';

export interface Student {
  id?: number;
  photo?: string | null;
  photo_src?: string | null;
  first_name?: string;
  last_name?: string;
  class_id?: number | null;
  class?: Class;
  grade?: Grade | null;
  grades?: Grade[] | null;
}

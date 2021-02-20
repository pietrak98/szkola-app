import {Class} from '../classes/class';
import {Grade} from '../grade/grade';

export interface Task {
  id?: number;
  name?: string;
  desc?: string;
  date_to?: string;
  class_id?: number | null;
  class?: Class;
  grades?: Grade[];
}

import {Student} from '../students/student';

export interface Class {
  id?: number;
  name?: string;
  students?: Student[];
}

import {Student} from '../students/student';
import { Task } from '../tasks/task';

export interface Grade {
  task?: Task;
  id?: number;
  grade?: string | null;
  student_id?: number | null;
  task_id?: number | null;
  student?: Student;
}

export const Grades: string[] = [
  'A', 'B', 'C', 'D', 'E'
];

const mapGrades = new Map();

mapGrades.set('A', 5);
mapGrades.set('B', 4);
mapGrades.set('C', 3);
mapGrades.set('D', 2);
mapGrades.set('E', 1);

export const GradesValues: Map<string, number> = mapGrades;

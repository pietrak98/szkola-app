import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import { Task } from './task';
import {Grades, GradesValues} from '../grade/grade';
import {TasksService} from './tasks.service';
import {ToastService} from '../../core/toast/toast.service';

@Component({
  selector: 'app-grades-add',
  templateUrl: './grades-add.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class GradesAddComponent implements OnInit {

  private modal?: NgbModalRef;
  private base64textString: any;
  environment: {
    filePublicUrl: string;
    apiUrl: string; production: boolean };

  task!: Task;
  grades: string[];

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private toastService: ToastService) {
    this.grades = Grades;
    this.environment = environment;
  }


  ngOnInit(): void {
    this.task = this.route.snapshot.data.task;

    // tslint:disable-next-line:no-non-null-assertion
    this.task.grades!.forEach((grade) => {
      this.task.class?.students?.map((student) => {
        if (grade.student_id === student.id) {
          student.grade = grade;
        } else if (!student.grade?.grade) {
          student.grade = {
            grade: null
          };
        }
        return student;
      });
    });

    console.log(this.task);
  }

  getCount(): number {
    return  this.task.class?.students?.reduce((sum: number, obj) => {
      if (obj.grade && obj.grade.grade !== null) {
        return sum + 1;
      }
      return sum;
    }, 0) || 0;
  }

  getAvg(): number {
    // tslint:disable-next-line:no-shadowed-variable
    // @ts-ignore
    const sum: number =  this.task.class?.students?.reduce((sum: number, obj) => {
      if (obj.grade && obj.grade.grade !== null) {
        // @ts-ignore
        return sum + parseFloat(GradesValues.get(obj?.grade?.grade) || 0);
      }
      return sum;
    }, 0);

    return sum / (this.getCount() || 1);
  }

  saveGrades(): void {
    this.tasksService.storeGrades(this.task.id, this.task.class).subscribe(() => {
      this.toastService.saved();
    });
  }
}

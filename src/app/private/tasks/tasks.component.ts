import {Component, Injectable, OnInit} from '@angular/core';
import {NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Class} from '../classes/class';
import {ClassesService} from '../classes/classes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from './task';
import {TasksService} from './tasks.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../core/toast/toast.service';
import {environment} from '../../../environments/environment';
import {UserProviderService} from '../user/userProvider.service';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = new Date(value);
      return {
        day : date.getDate(),
        month : date.getMonth(),
        year : date.getFullYear()
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = new Date(value);
      return {
        day : date.getDate(),
        month : date.getMonth(),
        year : date.getFullYear()
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : '';
  }
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],

  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class TasksComponent implements OnInit {
  public tasks: Task[] | undefined;
  public classes: Class[] | undefined;

  public form: FormGroup;

  public newTask: Task = {
    name: '',
    desc: '',
    class_id: null,
    date_to: ''
  };

  private modal?: NgbModalRef;

  environment: {
    filePublicUrl: string;
    apiUrl: string; production: boolean };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private classesService: ClassesService,
              private tasksService: TasksService,
              private toastService: ToastService,
              public loginUser: UserProviderService) {
    this.form = fb.group({
      name: [
        '',
        [Validators.required]
      ],
      desc: [
        '',
        [Validators.required]
      ],
      class_id: [
        '',
        Validators.required
      ],
      date_to: [
        '',
        Validators.required
      ]
    });

    this.environment = environment;
  }

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks;

    this.tasks?.forEach((task) => {
      // tslint:disable-next-line:no-non-null-assertion
      task.grades!.forEach((grade) => {
        task.class?.students?.map((student) => {
          if (grade.student_id === student.id) {
            student.grade = grade;
          }
        });
      });
    });
  }

  addTask(modal: any): void {

    this.newTask = {
      name: '',
      desc: '',
      class_id: null,
      date_to: ''
    };

    if (this.classes === undefined) {
      this.classesService.getAll().subscribe((data: Class[]) => this.classes = data);
    }

    this.modal = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  storeTask(): void {
    let promise;
    if (this.newTask.id === undefined) {
      promise = this.tasksService.store(this.newTask);
    } else {
      promise = this.tasksService.edit(this.newTask.id, this.newTask);
    }

    promise.subscribe((result) => {
      if (this.newTask.id === undefined) {
        this.tasks?.push(result as Task);
      }
      this.modal?.close();
      this.toastService.saved();
    });

  }

  delete(task: Task): void {
    this.tasksService.delete(task.id).subscribe(() => {
      this.toastService.saved();
      // @ts-ignore
      const index = this.tasks.indexOf(task, 0);
      if (index > -1) {
        // @ts-ignore
        this.tasks.splice(index, 1);
      }
    });


  }

  edit(modal: any, task: Task): void {
    this.newTask = task;
    if (this.classes === undefined) {
      this.classesService.getAll().subscribe((data: Class[]) => this.classes = data);
    }

    this.modal = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }
}


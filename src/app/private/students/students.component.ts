import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Class} from '../classes/class';
import {ClassesService} from '../classes/classes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from './student';
import {StudentsService} from './students.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../core/toast/toast.service';
import {environment} from '../../../environments/environment';
import {User} from '../user/user';
import {UserProviderService} from '../user/userProvider.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  public students: Student[] | undefined;
  public classes: Class[] | undefined;

  public form: FormGroup;

  public newStudent: Student = {
    first_name: '',
    last_name: '',
    class_id: null,
    photo: null
  };

  private modal?: NgbModalRef;
  private base64textString: any;
  environment: {
    filePublicUrl: string;
    apiUrl: string; production: boolean
  };
  user: User | undefined;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private classesService: ClassesService,
              private studentsService: StudentsService,
              private toastService: ToastService,
              public loginUser: UserProviderService) {
    this.form = fb.group({
      first_name: [
        '',
        [Validators.required]
      ],
      last_name: [
        '',
        [Validators.required]
      ],
      class_id: [
        '',
        Validators.required
      ]
    });

    this.environment = environment;
  }

  ngOnInit(): void {
    this.students = this.route.snapshot.data.students;
    this.students?.map((student) => {
      if (student.photo) {
        student.photo = environment.filePublicUrl + student.photo;
      }
    });
  }

  addStudent(modal: any): void {

    this.newStudent = {
      first_name: '',
      last_name: '',
      class_id: null,
      photo: null
    };

    if (this.classes === undefined) {
      this.classesService.getAll().subscribe((data: Class[]) => this.classes = data);
    }

    this.modal = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  storeStudent(): void {
    let promise;
    if (this.newStudent.id === undefined) {
      promise = this.studentsService.store(this.newStudent);
    } else {
      promise = this.studentsService.edit(this.newStudent.id, this.newStudent);
    }

    promise.subscribe((result) => {
      if (this.newStudent.id === undefined) {
        this.students?.push(result as Student);
      } else {

        result = result as Student;

        // @ts-ignore
        const objIndex =  this.students?.findIndex((obj => obj.id === result.id));
        // @ts-ignore
        this.students[objIndex] =  result;
      }
      this.modal?.close();
      this.toastService.saved();
    });

  }

  delete(student: Student): void {
    this.studentsService.delete(student.id).subscribe(() => {
      this.toastService.saved();
      // @ts-ignore
      const index = this.students.indexOf(student, 0);
      if (index > -1) {
        // @ts-ignore
        this.students.splice(index, 1);
      }
    });


  }

  edit(modal: any, student: Student): void {
    this.newStudent = student;
    if (this.classes === undefined) {
      this.classesService.getAll().subscribe((data: Class[]) => this.classes = data);
    }

    this.modal = this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e: any): void {
    this.newStudent.photo_src = 'data:image/png;base64,' + btoa(e.target.result);
    console.log(this);
  }
}

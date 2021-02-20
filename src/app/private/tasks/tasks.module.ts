import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import {CoreModule} from '../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {GradesAddComponent} from './grades-add.component';


@NgModule({
  declarations: [TasksComponent, GradesAddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgbDatepickerModule,
    RouterModule
  ]
})
export class TasksModule { }

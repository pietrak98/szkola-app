import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import {CoreModule} from '../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [StudentsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CoreModule,
        NgbTooltipModule
    ]
})
export class StudentsModule { }

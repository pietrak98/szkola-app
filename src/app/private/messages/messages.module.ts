import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import {CoreModule} from '../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {MessageComponent} from './message.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [MessagesComponent, MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgbTooltipModule,
    RouterModule
  ]
})
export class MessagesModule { }

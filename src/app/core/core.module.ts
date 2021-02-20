import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlMessagesComponent} from './forms/control-messages/control-messages.component';



@NgModule({
  declarations: [ControlMessagesComponent],
  exports: [
    ControlMessagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }

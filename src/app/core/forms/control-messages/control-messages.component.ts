import {Component, Input} from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {ValidationService} from '../validation.service';

@Component({
  selector: 'app-control-messages',
  template: `
    <div *ngIf="errorMessage() !== null" class="text-danger">
      <ul>
        <li *ngFor="let error of errorMessage()">{{error}}</li>
      </ul>
    </div>
  `
})
export class ControlMessagesComponent {
  @Input() control: any;

  constructor() {
  }

  public errorMessage(): any {
    const result = [];
    // @ts-ignore
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        result.push(ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]));
      }
    }
    if (result.length) {
      return result;
    }
    return null;
  }
}

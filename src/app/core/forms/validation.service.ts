import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static getValidatorErrorMessage(validatorName: any, validatorValue?: any): any {
    const config = {
      required: 'Wymagane',
      email: 'Nieprawidłowy adres email',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimalna długość ${validatorValue.requiredLength}`
    };

    // @ts-ignore
    return config[validatorName];
  }

  public passwordValidator(control: { value: string; }): object | null {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return {invalidPassword: true};
    }
  }
}

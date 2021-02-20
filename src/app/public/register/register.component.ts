import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../private/user/user';
import {UserService} from '../../private/user/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  registerData: User = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: 1
  };

  loading = false;

  constructor(fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      first_name: [
        '',
        [Validators.required]
      ],
      last_name: [
        '',
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        Validators.required
      ],
      password_confirmation: [
        '',
        Validators.required
      ],
      type: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  register() {
    this.loading = true;
    console.log(this.registerData);
    this.userService.registerUser(this.registerData).subscribe((res: any) => {
      this.loading = false;
    });
  }
}

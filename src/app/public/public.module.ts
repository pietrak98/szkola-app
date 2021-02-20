import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GuestGuardService} from '../services/guest-guard.service';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import { PublicComponent } from './public.component';
import {PrivateComponent} from '../private/private.component';
import {UserResolveService} from '../private/user/user-resolve.service';
import {AuthGuardService} from '../services/auth-guard.service';
import {HomeComponent} from '../private/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    canActivate: [GuestGuardService],
    children: [
     {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginModule,
    RegisterModule,
    RouterModule.forChild(routes),
  ]
})
export class PublicModule { }

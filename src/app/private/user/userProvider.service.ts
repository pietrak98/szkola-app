import { Injectable } from '@angular/core';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProviderService {

  constructor() {
  }

  get(): User {
    return (JSON.parse(localStorage.getItem('user') as string));
  }
}

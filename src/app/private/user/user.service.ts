import { Injectable } from '@angular/core';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) {
  }

  registerUser(user: User): any {
    // @ts-ignore
    return this.http.post(environment.apiUrl + '/register', user).pipe(
      catchError(this.handleError(`addHero`, user))
    );
  }

  getActiveUser(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/active_user')
      .pipe(
        catchError(this.handleError<User[]>('getActiveUser', []))
      );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

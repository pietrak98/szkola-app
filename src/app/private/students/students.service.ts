import { Injectable } from '@angular/core';
import {Student} from './student';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private http: HttpClient) {
  }

  getAll(): any {
    // @ts-ignore
    return this.http.get(environment.apiUrl + '/students', {}).pipe(
      catchError(this.handleError(`studentsget`))
    );
  }

  store(student: Student): Observable<unknown> {
    return this.http.post(environment.apiUrl + '/students', student).pipe(
      catchError(this.handleError(`studentsget`))
    );
  }

  edit(id: number, student: Student): Observable<unknown> {
    return this.http.put(environment.apiUrl + '/students/' + id, student).pipe(
      catchError(this.handleError(`studentsget`))
    );
  }

  delete(id: number | undefined): Observable<unknown> {
    return this.http.delete(environment.apiUrl + '/students/' + id).pipe(
      catchError(this.handleError(`studentsget`))
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

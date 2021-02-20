import { Injectable } from '@angular/core';
import {Task} from './task';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient) {
  }

  getAll(): any {
    // @ts-ignore
    return this.http.get(environment.apiUrl + '/tasks', {}).pipe(
      catchError(this.handleError(`tasksget`))
    );
  }

  get(id: number): any {
    return this.http.get(environment.apiUrl + '/tasks/' + id, {}).pipe(
      catchError(this.handleError(`tasksget`))
    );
  }

  store(student: Task): Observable<unknown> {
    return this.http.post(environment.apiUrl + '/tasks', student).pipe(
      catchError(this.handleError(`tasksget`))
    );
  }

  edit(id: number, student: Task): Observable<unknown> {
    return this.http.put(environment.apiUrl + '/tasks/' + id, student).pipe(
      catchError(this.handleError(`tasksget`))
    );
  }

  delete(id: number | undefined): Observable<unknown> {
    return this.http.delete(environment.apiUrl + '/tasks/' + id).pipe(
      catchError(this.handleError(`tasksget`))
    );
  }

  storeGrades(id: any, body: any): Observable<unknown> {
    return this.http.put(environment.apiUrl + '/tasks/' + id + '/grades', body).pipe(
      catchError(this.handleError(`tasksget`))
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

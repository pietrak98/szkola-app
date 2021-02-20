import { Injectable } from '@angular/core';
import {Class} from './class';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(
    private http: HttpClient) {
  }

  getAll(): any {
    // @ts-ignore
    return this.http.get(environment.apiUrl + '/classes', {}).pipe(
      catchError(this.handleError(`classesget`))
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

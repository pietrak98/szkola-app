import { Injectable } from '@angular/core';
import {Message} from './message';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private http: HttpClient) {
  }

  getAll(): any {
    // @ts-ignore
    return this.http.get(environment.apiUrl + '/messages', {}).pipe(
      catchError(this.handleError(`messagesget`))
    );
  }

  store(student: Message): Observable<unknown> {
    return this.http.post(environment.apiUrl + '/messages', student).pipe(
      catchError(this.handleError(`messagesget`))
    );
  }

  setRead(id: number): Observable<unknown> {
    return this.http.put(environment.apiUrl + '/messages/' + id + '/setread', []).pipe(
      catchError(this.handleError(`messagesget`))
    );
  }

  delete(id: number | undefined): Observable<unknown> {
    return this.http.delete(environment.apiUrl + '/messages/' + id).pipe(
      catchError(this.handleError(`messagesget`))
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
  get(id: number): any {
    return this.http.get(environment.apiUrl + '/messages/' + id, {}).pipe(
      catchError(this.handleError(`messagesget`))
    );
  }

}

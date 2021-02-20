import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<ArrayBuffer> {
    url = this.updateUrl(url);
    return this.http.get(url, options);
  }

  post(url: string, body: string, options?: any): Observable<ArrayBuffer> {
    url = this.updateUrl(url);
    return this.http.post(url, body, options);
  }

  put(url: string, body: string, options?: any): Observable<ArrayBuffer> {
    url = this.updateUrl(url);
    return this.http.put(url, body, options);
  }

  delete(url: string, options?: any): Observable<ArrayBuffer> {
    url = this.updateUrl(url);
    return this.http.delete(url, options);
  }

  // tslint:disable-next-line:typedef
  private updateUrl(req: string) {
    return environment.apiUrl + req;
  }
}

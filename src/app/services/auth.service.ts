import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  /**
   * Constructor
   * @param httpClient The http client object
   */
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  login(e: string, p: string) {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(environment.apiUrl + '/oauth/token', {
      grant_type: 'password',
      client_id: '2',
      client_secret: '60fljkDwmVYoOnoLJKsqCV4hw86fSviTBojQ4YQr',
      username: e,
      password: p,
      scope: ''
    }, options);
  }

  /**
   * Revoke the authenticated user token
   */
  logout() {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.httpClient.get(environment.apiUrl + '/token/revoke', options);
  }

}

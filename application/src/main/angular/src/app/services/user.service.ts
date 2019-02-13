import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";

import { User } from '../classes/user';

@Injectable()
export class UserService {

  private url = '/api-users';

  constructor(private http: Http) { }

  newUser(name: string, pass: string, nickName: string, captchaToken: string) {
    console.log("POST new user " + name);

    let body = JSON.stringify([name, pass, nickName, captchaToken]);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });
    return this.http.post(this.url + "/new", body, options)
      .pipe(map(response => {
        console.log("POST new user SUCCESS. Response: ", (response.json() as User));
        return (response.json() as User);
      }),
      catchError(error => this.handleError("POST new user FAIL. Response: ", error)));
  }

  changePassword(oldPassword: string, newPassword: string) {
    console.log("PUT existing user (change password)");

    let body = JSON.stringify([oldPassword, newPassword]);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });
    return this.http.put(this.url + "/changePassword", body, options)
      .pipe(map(response => {
        console.log("PUT existing user SUCCESS (change password). Response: ", (response.json() as boolean));
        return (response.json() as boolean);
      }),
      catchError(error => this.handleError("PUT existing user FAIL (change password). Response: ", error)));
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    return Observable.throw("Server error (" + error.status + "): " + error.text())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
interface authResponse {
  success: boolean,
  message: any,
  secret: any
}

interface regResponse {
  success: boolean,
  message: string,
  data: any
}
@Injectable()
export class AuthService {
  private loggedInStatus = false;
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    // return this.loggedInStatus;
    return observableOf(this.loggedInStatus);
  }

  login(email, password) {
    return this.http.post<authResponse>('/api/auth/login', {
      email,
      password
    });
  }


  registerDetails(obj) {
    return this.http.post<regResponse>('/api/auth/register', {
    ...obj
    });
  }

  updateUserDetails(obj) {
    return this.http.post<regResponse>('/api/auth/updateUserDetails', {
    ...obj
    });
  }
}

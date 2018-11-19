import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf, Subject, BehaviorSubject } from 'rxjs';
// import * as Rx from 'rxjs';

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
  banners$: Subject<any> = new BehaviorSubject<boolean>(null);

// setBanners(banners: any[]): void {
//     this.banners$.next(banners);
// }
  // observable = Observable.create((observer) => {
  //   console.log(this.loggedInStatus,'33333333333333');
  //   observer.next(this.loggedInStatus);
  // });

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    this.banners$.next(this.loggedInStatus);
  }

  get isLoggedIn() {
    // this.banners$.next(this.loggedInStatus);
    return this.loggedInStatus;
    // return observableOf(this.loggedInStatus);
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

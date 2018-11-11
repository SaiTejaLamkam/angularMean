import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface dbData {
  email: string,
  status: boolean,
  quote: string
}

interface isLoggedIn {
  status: string
}
interface logoutData {
  success: string
}
interface quoteStatus {
  success: string
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient, private store: Store<any>) { }

  getUserData() {
    return this.http.get<dbData>('/api/auth/loggedUserData');
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/auth/isLoggedIn');
  }

  logout() {
    return this.http.get<logoutData>('/api/auth/logout');
  }

  updateQuote(value) {
    return this.http.post<quoteStatus>('/api/auth/updateUserQuote', { value });
  }

  getAllState() {
    return this.store.select('appReducer');
  }

  updateState(obj) {
    return this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    });
  }
}

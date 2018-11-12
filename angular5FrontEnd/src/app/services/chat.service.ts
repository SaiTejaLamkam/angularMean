import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {
    private url = 'http://localhost:1234';
    private socket;

    constructor(
        private http: HttpClient
    ) {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
            console.log(message, '+++++++++++++');
              observer.next(message);
          });
      });
  }

  searchUser(payload) {
    return this.http.post('/api/user/searchUser', payload);
  }
}

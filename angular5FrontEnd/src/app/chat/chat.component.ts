import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, Observable, of, concat, from } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  catchError,
  map,
  count,
  filter
} from 'rxjs/operators';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  manufacurersList$: Observable<any>;
  manufacurersListinput$ = new Subject<string>();
  manufacturersList = [];
  selectedManufacturer: any;
  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    $('#live-chat header').on('click', function() {

      $('.chat').slideToggle(300, 'swing');
      $('.chat-message-counter').fadeToggle(300, 'swing');

  });

  $('.chat-close').on('click', function(e) {

      e.preventDefault();
      $('.chat').slideToggle(300, 'swing');

  });
  this.fetchManufacturersList();
  }

  fetchManufacturersList() {
    this.manufacurersList$ = concat(
      of([]), // default items
      this.manufacurersListinput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(checkStringCount => {
          if (checkStringCount.length > 1) {
            return true;
          }
        }),
        //  tap(() => this.people3Loading = true),
        switchMap((term: string) => {
          console.log(term, '--------');
          const payload = {
            userNm: term
          };
          return this.chatService.searchUser(payload).pipe(
            map((response: any) => {
              console.log(response, '++++++++++');
              return (this.manufacturersList = response.users);
              // if (response.responseCode === 'E200') {
              //   return (this.manufacturersList = response.data);
              // } else if (response.response === 'E400') {
              //   return (this.manufacturersList = []);
              // }
            }),
            catchError(error => {
              return of([]);
            })
          );
          // return [term];
        })
      )
    );
  }

}

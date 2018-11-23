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
  filter,
  finalize
} from 'rxjs/operators';
import { ChatService } from '../services/chat.service';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationPopupComponent } from '../popups/confirmation-popup/confirmation-popup.component';

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
  userData: any;

  filteredUsers = [];
  usersForm: FormGroup;
  isLoading = false;
  constructor(
    private chatService: ChatService,
    private store: Store<any>,
    private fb: FormBuilder,
    public dialog: MatDialog,
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
  this.store.select('appReducer').subscribe( data => {
    this.userData = data;
    console.log(data, '++++++++++++++++++');
  });
  // this.fetchManufacturersList();

  this.usersForm = this.fb.group({
    userInput: null
  });

    this.usersForm
    .get('userInput')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.chatService.searchUser({userNm: value})
      .pipe(
        finalize(() => this.isLoading = false),
        )
      )
    )
    .subscribe(response => {
      this.filteredUsers = response['users'];
      console.log(response, '=======');
    } );

  }

  displayFn(user) {
    if (user) { return user.name; }
  }

  // fetchManufacturersList() {
  //   this.manufacurersList$ = concat(
  //     of([]), // default items
  //     this.manufacurersListinput$.pipe(
  //       debounceTime(200),
  //       distinctUntilChanged(),
  //       filter(checkStringCount => {
  //         if (checkStringCount.length > 1) {
  //           return true;
  //         }
  //       }),
  //       //  tap(() => this.people3Loading = true),
  //       switchMap((term: string) => {
  //         console.log(term, '--------');
  //         const payload = {
  //           userNm: term
  //         };
  //         return this.chatService.searchUser(payload).pipe(
  //           map((response: any) => {
  //             console.log(response, '++++++++++');
  //             return (this.manufacturersList = response.users);
  //           }),
  //           catchError(error => {
  //             return of([]);
  //           })
  //         );
  //       })
  //     )
  //   );
  // }

  onSelectUser(event) {
    console.log(event.option.value, this.usersForm.get('userInput').value, '===================');
    const modalData = event.option.value;
    modalData.type = 'friendRequestConfirmation';
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      disableClose: true,
      // width: '250px',
      // position: {top: '30px', right: '10px'}
      data: modalData
    });
  }
}

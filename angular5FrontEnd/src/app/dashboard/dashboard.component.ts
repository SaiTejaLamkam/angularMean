import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ACTION_LOGIN } from '../store/actions/appActions';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quote = 'Loading Quote';
  email = 'loading email';
  message: string;
  messages = [];
  userData: any;
  constructor(
    private user: UserService,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.user.getUserData().subscribe(data => {
      if (data.status) {
        this.quote = data.quote;
      this.email = data.email;
      this.userData = data;
      this.user.updateState({action: ACTION_LOGIN, payload: data});
      } else {
        // this.router.navigate(['logout'])
      }
    });

    this.chatService.getMessages().subscribe((message: string) => {
        console.log(message, '**********');
        this.messages.push(message);
      });
  }

  updateQuote(event) {
    const value = event.target.parentNode.querySelector('#myQuote').value;
    this.user.updateQuote(value).subscribe(data => {
      if (data.success) {
        alert('Your quote was updated');
      } else {
        alert('There was some problem');
      }
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}

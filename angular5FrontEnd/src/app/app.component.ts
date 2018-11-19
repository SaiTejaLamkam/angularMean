import { Component, OnInit } from '@angular/core';
import {DemoServiceService} from './demo-service.service';
import { resolve } from 'q';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';
interface MyData {
  obj: Object[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged;
  // public subject = new Subject();
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  //  this.isLogged = this.authService.isLoggedIn;
  this.authService.banners$.subscribe((data) => {
    this.isLogged = data;
    console.log(data, '++++++++++++'); // 0.24957144215097515 (random number)
});

  // this.authService.observable.subscribe(this.subject);
  }
}

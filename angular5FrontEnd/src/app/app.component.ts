import { Component, OnInit } from '@angular/core';
import {DemoServiceService} from './demo-service.service';
import { resolve } from 'q';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
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
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
   this.isLogged = this.authService.isLoggedIn;
  }
}

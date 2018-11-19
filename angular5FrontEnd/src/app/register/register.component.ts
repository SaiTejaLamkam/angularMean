import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ACTION_LOGIN } from '../store/actions/appActions';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
// import * as Rx from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
// public subject;
public subject = new Subject();
  constructor(
    private Auth: AuthService,
    private router: Router,
    private user: UserService) {}

  ngOnInit() {
    $(function() {
      $('#login-form-link').click(function(e) {
      $('#login-form').delay(100).fadeIn(100);
       $('#register-form').fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
      $('#register-form').delay(100).fadeIn(100);
       $('#login-form').fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
  });

//   this.subject.subscribe((data) => {
//     console.log(data, '++++++++++++'); // 0.24957144215097515 (random number)
// });

  // this.Auth.observable.subscribe(this.subject);

  }


  registerUser(event) {
    event.preventDefault();
    const errors = [];
    const target = event.target;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;
    const postObj = {
      username : username,
      email: email,
      password: password,
      cpassword: cpassword
    };
    if (password !== cpassword) {
      errors.push('Passwords are not same');
    }
    if (errors.length === 0) {
      this.Auth.registerDetails(postObj).subscribe(data => {
        // console.log(data);
         if (data.success) {
           this.router.navigate(['dashboard']);
           this.Auth.setLoggedIn(true);
         } else {
           window.alert(data.message);
         }
       });
    }
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.Auth.login(username, password).subscribe(data => {
    //  console.log(data);
      if (data.success) {
        this.router.navigate(['dashboard']);
        this.Auth.setLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(data));
      } else {
        window.alert(data.message);
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }


}

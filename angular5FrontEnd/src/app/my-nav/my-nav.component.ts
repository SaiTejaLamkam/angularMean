import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { ProfilePopupComponent } from '../popups/profile-popup/profile-popup.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ACTION_LOGOUT } from '../store/actions/appActions';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {
  userState: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<any>,
    public dialog: MatDialog,
    private user: UserService,
    private router: Router,
    private Auth: AuthService
  ) {}

  ngOnInit() {
    this.store.select('appReducer').subscribe( data => {
      this.userState = data;
      // console.log(data, '++++++++++++++++++');
    });
  }

  profileClick() {
    // console.log('-----');
    const dialogRef = this.dialog.open(ProfilePopupComponent, {
      disableClose: true
      // width: '250px',
      // position: {top: '30px', right: '10px'}
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  logout() {
    this.user.logout().subscribe(data => {
      if (data.success) {
        this.router.navigate(['']);
        this.Auth.setLoggedIn(false);
        localStorage.removeItem('currentUser');
        this.user.updateState({ action: ACTION_LOGOUT });
      } else {
        window.alert('Some Problem');
      }
    });
  }
  }

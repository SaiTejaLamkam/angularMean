import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoServiceService } from './demo-service.service';
import { AuthService } from './auth.service';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { FirstPipe } from './first.pipe';
import { RedBlackDirective } from './red-black.directive';
import { StoreModule } from '@ngrx/store';

import { reducers } from './store/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { JwtInterceptor } from './_helpers';
import {ProfilePopupComponent} from './popups/profile-popup/profile-popup.component';
import { ChatService } from './services/chat.service';
import { ChatComponent } from './chat/chat.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataComponent,
    DashboardComponent,
    RegisterComponent,
    FirstPipe,
    RedBlackDirective,
    MyNavComponent,
    FieldErrorDisplayComponent,
    ProfilePopupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    RouterModule.forRoot([
      {
        path: 'data',
        component: DataComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        component: RegisterComponent
      }
    ]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgSelectModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [
    DemoServiceService,
    AuthService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ChatService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProfilePopupComponent],
})
export class AppModule implements OnInit {
  ngOnInit() {
    $('#live-chat header').on('click', function() {

      $('.chat').slideToggle(300, 'swing');
      $('.chat-message-counter').fadeToggle(300, 'swing');

  });

  $('.chat-close').on('click', function(e) {

      e.preventDefault();
      $('#live-chat').fadeOut(300);

  });
  }
}

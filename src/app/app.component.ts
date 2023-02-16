import { Component } from '@angular/core';
import { GoogleApiService, UserInfo } from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';

  userInfo?: UserInfo;

  constructor(private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info;
    })
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.googleApi.isLoggedIn();
  }

  logOut() {
    this.googleApi.signOut();
  }
}

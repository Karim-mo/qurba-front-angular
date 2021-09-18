import { Component } from '@angular/core';
import { usersApiService } from './services/users-api.service';
import { Subscription } from 'rxjs';
import { userState } from './models/UserModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qurba-front-angular';

  userSubscription: Subscription;
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };

  constructor(private usersService: usersApiService) {
    this.user.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {};
  }

  ngOnInit(): void {
    this.userSubscription = this.usersService
      .userReducer()
      .subscribe((value) => {
        this.user = value;
      });
    this.usersService.setState(this.user);
  }
}

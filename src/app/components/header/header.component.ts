import { Component, OnInit } from '@angular/core';
import { usersApiService } from '../../services/users-api.service';
import { Subscription } from 'rxjs';
import { userState } from '../../models/UserModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userSubscription: Subscription;
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };

  constructor(private usersService: usersApiService) {}

  ngOnInit(): void {
    this.userSubscription = this.usersService
      .userReducer()
      .subscribe((value) => {
        this.user = value;
      });
    this.usersService.getState();
  }

  onLogout(): void {
    this.usersService.logout();
  }

  isUserLoggedIn(): boolean {
    return this.user.user && Object.keys(this.user.user).length > 0;
  }
}

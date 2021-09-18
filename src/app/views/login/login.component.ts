import { Component, OnInit } from '@angular/core';
import { usersApiService } from '../../services/users-api.service';
import { Subscription } from 'rxjs';
import { userState } from '../../models/UserModel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userSubscription: Subscription;
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };
  message: string;
  showMessage: boolean = false;
  emailUserPhone: string;
  password: string;
  messageSubject: any = new Subject();

  constructor(private usersService: usersApiService, private router: Router) {}

  onLogin(): void {
    if (!this.emailUserPhone || !this.password) {
      this.message = 'Check your input details and try again.';
      this.showMessage = true;
      this.messageSubject.next();
      return;
    }
    this.usersService.login({
      emailUserPhone: this.emailUserPhone,
      password: this.password,
    });
    this.emailUserPhone = '';
    this.password = '';
  }

  ngOnInit(): void {
    this.messageSubject.subscribe(() =>
      setTimeout(() => {
        this.showMessage = false;
        this.message = '';
      }, 3000)
    );

    this.userSubscription = this.usersService
      .userReducer()
      .subscribe((value) => {
        this.user = value;
        if (value.error) {
          this.message = value.error;
          this.showMessage = true;
          this.messageSubject.next();
          this.usersService.resetErrors();
        } else if (this.user.user && Object.keys(this.user.user).length > 0) {
          this.router.navigate(['/']);
        }
      });
    this.usersService.getState();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.messageSubject.unsubscribe();
  }
}

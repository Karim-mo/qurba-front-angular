import { Component, OnInit } from '@angular/core';
import { usersApiService } from '../../services/users-api.service';
import { Subscription } from 'rxjs';
import { userState } from '../../models/UserModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userSubscription: Subscription;
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };
  message: string;
  showMessage: boolean = false;
  success: boolean = false;
  name: string;
  emailUserPhone: string;
  password: string;
  cooldown: boolean = false;
  registered: boolean = false;
  messageSubject: any = new Subject();
  cooldownSubject: any = new Subject();

  constructor(private usersService: usersApiService) {}

  onRegister(): void {
    if (!this.emailUserPhone || !this.password || !this.name) {
      this.success = false;
      this.message = 'Check your input details and try again.';
      this.showMessage = true;
      this.messageSubject.next();
      this.cooldown = true;
      this.cooldownSubject.next();
      return;
    }
    this.usersService.register({
      name: this.name,
      emailUserPhone: this.emailUserPhone,
      password: this.password,
    });
    this.registered = true;
    this.name = '';
    this.emailUserPhone = '';
    this.password = '';
  }

  ngOnInit(): void {
    this.messageSubject.subscribe(() =>
      setTimeout(() => {
        this.showMessage = false;
        this.success = false;
        this.message = '';
      }, 3000)
    );

    this.cooldownSubject.subscribe(() =>
      setTimeout(() => {
        this.cooldown = false;
      }, 5000)
    );

    this.userSubscription = this.usersService
      .userReducer()
      .subscribe((value) => {
        console.log(value);
        this.user = value;
        if (value.error) {
          this.success = false;
          this.message = value.error;
          this.showMessage = true;
          this.messageSubject.next();
        } else if (
          this.registered &&
          this.user.user &&
          Object.keys(this.user.user).length > 0
        ) {
          this.success = true;
          this.message = 'Successfully created an account.';
          this.showMessage = true;
          this.messageSubject.next();
        }
      });
    this.usersService.getState();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.messageSubject.unsubscribe();
    this.cooldownSubject.unsubscribe();
  }
}

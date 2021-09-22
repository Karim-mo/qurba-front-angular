import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { userState } from './models/UserModel';
import { Subject } from 'rxjs';
import { AgsmService } from 'agsm';
import { StoreService } from './agsm/store.service';

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

  constructor(private agsm: AgsmService, private store: StoreService) {
    this.user.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {};
  }

  ngOnInit(): void {
    this.userSubscription = this.agsm
      .stateSelector((state) => state.userReducer)
      .subscribe((value) => {
        this.user = value;
      });
    this.agsm.setReducerState('userReducer', this.user, true);
    // this.userSubscription = this.usersService
    //   .userReducer()
    //   .subscribe((value) => {
    //     this.user = value;
    //   });
    // this.usersService.setState(this.user);
  }
}

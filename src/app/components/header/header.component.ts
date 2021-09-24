import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userState } from '../../models/UserModel';
import { Subject } from 'rxjs';
import { AgsmService } from 'agsm';
import { UserActionsService } from 'src/app/agsm/actions/user-actions.service';

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

  constructor(
    private agsm: AgsmService,
    private userActions: UserActionsService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.agsm
      .stateSelector((state) => state.userReducer)
      .subscribe((value) => {
        this.user = value;
      });
    //this.agsm.getStateValue((state) => state.userReducer);
  }

  onLogout(): void {
    this.userActions.logout();
  }

  isUserLoggedIn(): boolean {
    return this.user.user && Object.keys(this.user.user).length > 0;
  }
}

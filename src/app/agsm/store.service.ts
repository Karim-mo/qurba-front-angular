import { Injectable, OnInit } from '@angular/core';
import { AgsmService } from 'agsm';
import { userState } from '../models/UserModel';
import {
  restaurantDetailsReducer,
  restaurantsReducer,
} from './reducers/restaurantsReducer';
import { userReducer } from './reducers/userReducer';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };

  constructor(private agsm: AgsmService) {
    this.agsm.linkDevTools(true);

    this.user.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {};

    this.agsm.addReducer('userReducer', userReducer);
    this.agsm.addReducer('restaurantsList', restaurantsReducer);
    this.agsm.addReducer('restaurantDetails', restaurantDetailsReducer);

    this.agsm.setStoreInitialState({
      userReducer: this.user,
    });
  }
}

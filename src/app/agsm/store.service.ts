import { Injectable, OnInit } from '@angular/core';
import { AgsmService } from 'agsm';
import {
  restaurantDetailsReducer,
  restaurantsReducer,
} from './reducers/restaurantsReducer';
import { userReducer } from './reducers/userReducer';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private agsm: AgsmService) {
    this.agsm.addReducer('userReducer', userReducer);
    this.agsm.addReducer('restaurantsList', restaurantsReducer);
    this.agsm.addReducer('restaurantDetails', restaurantDetailsReducer);
  }
}

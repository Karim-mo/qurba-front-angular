import { Injectable, OnInit } from '@angular/core';
import { AgsmService } from 'agsm';
import { userReducer } from './reducers/userReducer';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private agsm: AgsmService) {
    this.agsm.addReducer('userReducer', userReducer);
  }
}

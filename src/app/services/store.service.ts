import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { userState } from '../models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  setState(): void {}

  getState(): void {}
}

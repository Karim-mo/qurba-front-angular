import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { restaurantsState } from '../models/RestaurantsModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class restaurantsApiService {
  private apiUrl = 'http://localhost:5001/data/restaurants';
  private _restaurantsReducer = new Subject<restaurantsState>();

  constructor(private http: HttpClient) {}

  async getAllRestaurants() {
    // Initial State
    let state: restaurantsState = {
      loading: true,
      restaurants: null,
      pages: 0,
      error: null,
    };

    this._restaurantsReducer.next(state);

    try {
      const { restaurants, pages } = await this.http
        .get<any>(this.apiUrl, httpOptions)
        .toPromise();

      state = {
        ...state,
        loading: false,
        restaurants,
        pages,
      };

      this._restaurantsReducer.next(state);
    } catch (e: any) {
      state = {
        ...state,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };

      this._restaurantsReducer.next(state);
    }
  }

  restaurantsReducer(): Observable<restaurantsState> {
    return this._restaurantsReducer.asObservable();
  }
}

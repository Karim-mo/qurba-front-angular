import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { restaurantsState } from '../models/RestaurantsModel';
import { restaurantDetailsState } from '../models/RestaurantDetailsModel';

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
  private _restaurantDetailsReducer = new Subject<restaurantDetailsState>();

  allRestaurantsState: restaurantsState = {
    loading: true,
    restaurants: null,
    pages: 0,
    error: null,
  };

  constructor(private http: HttpClient) {}

  async getAllRestaurants() {
    this._restaurantsReducer.next(this.allRestaurantsState);

    try {
      const { restaurants, pages } = await this.http
        .get<any>(this.apiUrl, httpOptions)
        .toPromise();

      this.allRestaurantsState = {
        ...this.allRestaurantsState,
        loading: false,
        restaurants,
        pages,
      };

      this._restaurantsReducer.next(this.allRestaurantsState);
    } catch (e: any) {
      this.allRestaurantsState = {
        ...this.allRestaurantsState,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };

      this._restaurantsReducer.next(this.allRestaurantsState);
    }
  }

  async getRestaurantDetails(id: string) {
    // Initial State
    let state: restaurantDetailsState = {
      loading: true,
      restaurant: null,
      error: null,
    };

    this._restaurantDetailsReducer.next(state);

    try {
      const restaurant = await this.http
        .get<any>(this.apiUrl + `/${id}`, httpOptions)
        .toPromise();

      state = {
        ...state,
        loading: false,
        restaurant,
      };

      this._restaurantDetailsReducer.next(state);
    } catch (e: any) {
      state = {
        ...state,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };

      this._restaurantDetailsReducer.next(state);
    }
  }

  async addRestaurant(restaurantData: any, userToken: string) {
    const newRestaurant = {
      name: restaurantData.name,
      image: restaurantData.image,
      description: restaurantData.description,
      category: restaurantData.category,
    };
    this.allRestaurantsState.restaurants.push(newRestaurant);

    this._restaurantsReducer.next(this.allRestaurantsState);

    try {
      await this.http
        .post<any>(
          this.apiUrl,
          { ...newRestaurant },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            }),
          }
        )
        .toPromise();
    } catch (e: any) {
      this.allRestaurantsState = {
        ...this.allRestaurantsState,
        loading: false,
        error: e.error ? e.error.message : e.message,
      };
      this.allRestaurantsState.restaurants.pop();

      this._restaurantsReducer.next(this.allRestaurantsState);
    }
  }

  restaurantsReducer(): Observable<restaurantsState> {
    return this._restaurantsReducer.asObservable();
  }

  restaurantDetailsReducer(): Observable<restaurantDetailsState> {
    return this._restaurantDetailsReducer.asObservable();
  }
}

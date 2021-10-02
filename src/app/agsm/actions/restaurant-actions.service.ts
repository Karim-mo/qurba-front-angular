import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  RESTAURANTS_FAIL,
  RESTAURANTS_SUCCESS,
  RESTAURANTS_REQUEST,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
} from '../types/types';
import { AgsmService } from 'agsm';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestaurantActionsService {
  private apiUrl = 'http://localhost:5001/data/restaurants';

  constructor(private http: HttpClient, private agsm: AgsmService) {}

  async getAllRestaurants() {
    this.agsm.dispatch(RESTAURANTS_REQUEST);

    try {
      const data = await this.http
        .get<any>(this.apiUrl, httpOptions)
        .toPromise();

      this.agsm.dispatch(RESTAURANTS_SUCCESS, data);
    } catch (e: any) {
      const error = e.error ? e.error.message : e.message;
      this.agsm.dispatch(RESTAURANTS_FAIL, error);
    }
  }

  async getRestaurantDetails(id: string) {
    this.agsm.dispatch(RESTAURANT_DETAILS_REQUEST);

    try {
      const restaurant = await this.http
        .get<any>(this.apiUrl + `/${id}`, httpOptions)
        .toPromise();

      this.agsm.dispatch(RESTAURANT_DETAILS_SUCCESS, restaurant);
    } catch (e: any) {
      const error = e.error ? e.error.message : e.message;
      this.agsm.dispatch(RESTAURANT_DETAILS_FAIL, error);
    }
  }

  async addRestaurant(restaurantData: any) {
    const newRestaurant = {
      name: restaurantData.name,
      image: restaurantData.image,
      description: restaurantData.description,
      category: restaurantData.category,
    };

    let restaurantsList: any;
    let userState: any;

    this.agsm
      .stateSelector((state) => state.restaurantsList)
      .subscribe((state) => (restaurantsList = state));
    this.agsm
      .stateSelector((state) => state.userReducer)
      .subscribe((state) => (userState = state));

    restaurantsList.restaurants.push(newRestaurant);

    this.agsm.dispatch(RESTAURANTS_SUCCESS, restaurantsList);

    try {
      await this.http
        .post<any>(
          this.apiUrl,
          { ...newRestaurant },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userState.user.token}`,
            }),
          }
        )
        .toPromise();
    } catch (e: any) {
      restaurantsList.restaurants.pop();

      this.agsm.dispatch(RESTAURANTS_SUCCESS, restaurantsList);

      const error = e.error ? e.error.message : e.message;
      this.agsm.dispatch(RESTAURANTS_FAIL, error);
    }
  }
}

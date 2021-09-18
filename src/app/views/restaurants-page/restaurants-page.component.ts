import { Component, OnInit } from '@angular/core';
import { restaurantsApiService } from '../../services/restaurantsApi.service';
import { restaurantsState } from '../../models/RestaurantsModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent implements OnInit {
  restaurantsListSubscription: Subscription;
  restaurantsList: restaurantsState = {
    restaurants: [],
    pages: 0,
    loading: true,
    error: null,
  };

  constructor(private restaurantsService: restaurantsApiService) {
    this.restaurantsListSubscription = this.restaurantsService
      .restaurantsReducer()
      .subscribe((value) => {
        this.restaurantsList = value;
      });
  }

  ngOnInit(): void {
    this.restaurantsService.getAllRestaurants();
  }

  ngOnDestroy(): void {
    this.restaurantsListSubscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurantsApiService } from '../../services/restaurantsApi.service';
import { restaurantDetailsState } from '../../models/RestaurantDetailsModel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
})
export class RestaurantDetailsComponent implements OnInit {
  restaurantDetailsSubscription: Subscription;
  restaurantDetails: restaurantDetailsState = {
    restaurant: {},
    loading: true,
    error: null,
  };

  constructor(
    private restaurantsService: restaurantsApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantDetailsSubscription = this.restaurantsService
      .restaurantDetailsReducer()
      .subscribe((value) => {
        this.restaurantDetails = value;
      });
    this.restaurantsService.getRestaurantDetails(
      this.route.snapshot.paramMap.get('id')
    );
    //console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.restaurantDetailsSubscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurantDetailsState } from '../../models/RestaurantDetailsModel';
import { Subscription } from 'rxjs';
import { RestaurantActionsService } from 'src/app/agsm/actions/restaurant-actions.service';
import { AgsmService } from 'agsm';

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
    private restaurantActions: RestaurantActionsService,
    private agsm: AgsmService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantDetailsSubscription = this.agsm
      .stateSelector((state) => state.restaurantDetails)
      .subscribe((value) => {
        this.restaurantDetails = value;
      });
    this.restaurantActions.getRestaurantDetails(
      this.route.snapshot.paramMap.get('id')
    );

    //console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnDestroy(): void {
    this.restaurantDetailsSubscription.unsubscribe();
  }
}

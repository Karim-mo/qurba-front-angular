import { Component, OnInit } from '@angular/core';
import { restaurantsState } from '../../models/RestaurantsModel';
import { userState } from '../../models/UserModel';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AgsmService } from 'agsm';
import { RestaurantActionsService } from 'src/app/agsm/actions/restaurant-actions.service';

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
  userSubscription: Subscription;
  user: userState = {
    user: {},
    loading: false,
    error: null,
  };
  name: string;
  image: string;
  description: string;
  category: string;

  constructor(
    private agsm: AgsmService,
    private restaurantActions: RestaurantActionsService,
    private modalService: NgbModal
  ) {}

  onAddRestaurant(): void {
    this.restaurantActions.addRestaurant({
      name: this.name,
      image: this.image,
      description: this.description,
      category: this.category,
    });
    this.modalService.dismissAll();
  }

  open(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then();
  }

  ngOnInit(): void {
    this.userSubscription = this.agsm
      .stateSelector((state) => state.userReducer)
      .subscribe((value) => {
        this.user = value;
      });

    this.restaurantsListSubscription = this.agsm
      .stateSelector((state) => state.restaurantsList)
      .subscribe((value) => {
        this.restaurantsList = value;
      });
    //this.agsm.getStateValue((state) => state.userReducer);
    this.restaurantActions.getAllRestaurants();
  }

  isUserLoggedIn(): boolean {
    return this.user.user && Object.keys(this.user.user).length > 0;
  }

  ngOnDestroy(): void {
    this.restaurantsListSubscription.unsubscribe();
  }
}

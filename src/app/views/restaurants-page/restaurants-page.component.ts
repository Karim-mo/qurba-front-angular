import { Component, OnInit } from '@angular/core';
import { restaurantsApiService } from '../../services/restaurantsApi.service';
import { restaurantsState } from '../../models/RestaurantsModel';
import { userState } from '../../models/UserModel';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { usersApiService } from 'src/app/services/users-api.service';

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
    private usersService: usersApiService,
    private restaurantsService: restaurantsApiService,
    private modalService: NgbModal
  ) {}

  onAddRestaurant(): void {
    this.restaurantsService.addRestaurant(
      {
        name: this.name,
        image: this.image,
        description: this.description,
        category: this.category,
      },
      this.user.user.token
    );
    this.modalService.dismissAll();
  }

  open(content: any): void {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then();
  }

  ngOnInit(): void {
    this.userSubscription = this.usersService
      .userReducer()
      .subscribe((value) => {
        this.user = value;
      });

    this.restaurantsListSubscription = this.restaurantsService
      .restaurantsReducer()
      .subscribe((value) => {
        this.restaurantsList = value;
      });
    this.usersService.getState();
    this.restaurantsService.getAllRestaurants();
  }

  isUserLoggedIn(): boolean {
    return this.user.user && Object.keys(this.user.user).length > 0;
  }

  ngOnDestroy(): void {
    this.restaurantsListSubscription.unsubscribe();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { restaurantsState } from 'src/app/models/RestaurantsModel';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: any;

  constructor() {}

  ngOnInit(): void {}
}

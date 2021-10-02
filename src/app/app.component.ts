import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { userState } from './models/UserModel';
import { Subject } from 'rxjs';
import { AgsmService } from 'agsm';
import { StoreService } from './agsm/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qurba-front-angular';

  constructor(private agsm: AgsmService, private store: StoreService) {}

  ngOnInit(): void {}
}

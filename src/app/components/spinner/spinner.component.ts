import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() color: string = '#e95420';
  @Input() width: string = '50px';
  @Input() height: string = '50px';
  @Input() marginTop: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() success: boolean = false;
  @Input() text: string = 'An error has occurred';
  constructor() {}

  ngOnInit(): void {}
}

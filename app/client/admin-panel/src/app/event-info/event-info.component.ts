import { Component, OnInit, Input } from '@angular/core';
import {QRCodeComponent} from 'angular2-qrcode';
@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  @Input() event;
  constructor() { 
  }

  ngOnInit() {
  }

}

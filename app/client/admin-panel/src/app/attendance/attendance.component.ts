import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  @Input() participants;
  @Input() attendees;

  constructor() { }

  ngOnInit() {
  }

}

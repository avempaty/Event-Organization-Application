import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventService } from '../event.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.css']
})
export class ModeratorsComponent implements OnInit {

  @Input() event;
  modControl: FormControl = new FormControl();

  constructor(
    private eventService: EventService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  addModerator() {
    // add moderator to participants
    if (this.modControl.value == null || this.modControl.value === '') {
      alert('Please enter moderator username');
      return;
    }

    if (this.modControl.value === this.event.creator) {
      alert('Cannot add yourself as a moderator');
      return;
    }

    if (this.event.moderators.some(mod => { return mod === this.modControl.value})) {
      alert('Moderator already exists!');
      return;
    }

    this.userService.userExists(this.modControl.value)
      .then(res => {
        if (res._id === null) {
          alert('Username does not exist!');
        } else {
          this.eventService.addModerator(this.event._id, this.modControl.value)
            .then(res => {
              if (res.success) {
                this.event.moderators.push(this.modControl.value);
                if (!this.event.participants.find(user => user === this.modControl.value)) {
                  this.event.participants.push(this.modControl.value);
                  this.event.attendees.push(this.modControl.value);
                }
               this.modControl.reset();
              }
            });
        }
      })
      .catch(err => {
          alert('Username does not exist!');
      });
  }

  removeModerator(moderator) {
    this.eventService.removeModerator(this.event._id, moderator)
      .then (res => {
        if (res.success) {
          let index = this.event.moderators.indexOf(moderator);
          if (index != -1) {
            this.event.moderators.splice(index, 1);
          }
        }
      });
  }
}

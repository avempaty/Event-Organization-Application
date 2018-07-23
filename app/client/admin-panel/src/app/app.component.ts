import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from'@angular/forms';
import { EventService } from './event.service';
import { ValidationService } from './validation.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  events = [];
  editMode;
  selectedEvent;
  loggedIn: Boolean = false;
  userControl: FormControl = new FormControl();
  passControl: FormControl = new FormControl();
  eventControl: FormControl = new FormControl();
  titleControl: FormControl = new FormControl();
  dateControl: FormControl = new FormControl();
  locationControl: FormControl = new FormControl();
  informationControl: FormControl = new FormControl();

  username: String;
  password: String;

  constructor(
    private eventService: EventService,
    private validationService: ValidationService,
    private userService: UserService
  ) { }

  changeEvent($event) {
    this.selectedEvent = this.events.find((event) => event._id === $event);
  }

  logIn() {
    this.validationService.validateUser(this.userControl.value, this.passControl.value)
      .then(res => {
        if (res.authenticated) {
          this.eventService.getEvents(this.userControl.value)
          .then(res => {
          this.events = res;
            if (this.events.length > 0) {
              this.eventControl.setValue(this.events[0]._id);
              this.selectedEvent = this.events[0];
            }  
          })
          .catch(() => alert('Unable to connect to server.'));
          this.username = this.userControl.value;
          this.password = this.passControl.value;
          this.userControl.reset();
          this.passControl.reset();
          this.loggedIn = true;
        } else {
          alert('Invalid username or password.');
        }
      })
      .catch(err => {
        alert('Server error, please try again.');
      });

 }

  logOut() {
    this.loggedIn = false;
    this.username = null;
    this.password = null;
    this.events = [];
    this.selectedEvent = null;
  }
  
  resetFields() {
      this.titleControl.reset();
      this.dateControl.reset();
      this.locationControl.reset();
      this.informationControl.reset();
  }

  cancelEdit() {
    this.editMode = null;
  }

  saveEvent() {
    // Validations
    if (this.dateControl.value === null) {
      alert('Please pick a date.');
      return;
    }

    let today = new Date();
    let other = new Date(this.dateControl.value);
    today = new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
    if (other.getTime() < today.getTime()) {
      alert('Date cannot be in the past.')
      return;
    }

    let e = {
      title: this.titleControl.value,
      date: new Date(new Date(this.dateControl.value).setHours(24)),
      location: this.locationControl.value,
      information: this.informationControl.value
    }
    if (this.editMode === 'add') {
      e['creator'] = this.username;
      this.eventService.addEvent(e)
        .then(res => {
          if (res.success) {
            this.resetFields();
            this.events.push(res.data);
            this.eventControl.setValue(res.data._id);
            this.selectedEvent = res.data;
            this.editMode = null;
          } else {
            alert('Missing fields');
          }
        });
    } else if (this.editMode === 'update') {
      this.eventService.updateEvent(this.selectedEvent._id, e)
        .then(res => {
          if (res.success) {
            this.events.some((event) => {
              if (event._id === this.selectedEvent._id) {
                Object.assign(event, e);
                this.selectedEvent = event;
                return true;
              }
              return false;
            })
            this.editMode = null;
          }
        });
    }
  }

  deleteEvent() {
    if (confirm('Are you sure you want to delete event: ' + this.selectedEvent.title + '?')) {
      this.eventService.removeEvent(this.selectedEvent._id)
        .then(res => {
          if (res.success) {
            let index = this.events.findIndex((event) => event._id === this.selectedEvent._id);
            if (index != -1) {
              this.events.splice(index, 1);
            }
            if (this.events.length > 0) {
              this.eventControl.setValue(this.events[0]._id);
              this.selectedEvent = this.events[0];
            } else {  
              this.selectedEvent = null;
            }
          }
        });
     }
  }

  setMode(mode) {
    this.editMode = mode;
    if (mode === 'update') {
      this.titleControl.setValue(this.selectedEvent.title);
      this.dateControl.setValue(new Date(this.selectedEvent.date).toISOString().substr(0, 10));
      this.locationControl.setValue(this.selectedEvent.location);
      this.informationControl.setValue(this.selectedEvent.information);
    } else {
      this.resetFields();
    }
  }
}

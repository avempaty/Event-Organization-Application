import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class EventService {

  private url = environment.apiUrl + 'api/events';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getEvents(creator) {
    return this.http
      .get(this.url + '?creator=' + creator)
        .toPromise()
        .then(response => response.json());
  }
 
  addEvent(event) {
    return this.http
      .post(this.url, JSON.stringify(event), {headers: this.headers})
        .toPromise()
        .then(response => response.json());
  }

  updateEvent(eventId, event) {
    return this.http
      .put(this.url + '/' + eventId, JSON.stringify(event), {headers: this.headers})
        .toPromise()
        .then(response => response.json());
  }

  removeEvent(eventId) {
    return this.http
      .delete(this.url + '/' + eventId)
        .toPromise()
        .then(response => response.json());
  }

  addModerator(eventId, moderator) {
    return this.http
      .post(this.url + '/' + eventId + '/moderators',
        JSON.stringify({username: moderator}),
        {headers: this.headers})
      .toPromise()
      .then(response => response.json());
  }

  removeModerator(eventId, moderator) {
    return this.http
      .delete(this.url + '/' + eventId + '/moderators/' + moderator)
        .toPromise()
        .then(response => response.json());
  }
}

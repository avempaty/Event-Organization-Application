import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  private url = environment.apiUrl + 'api/users';

  constructor(private http: Http) { }

  userExists(username) {
    return this.http
      .get(this.url + "/" + username)
        .toPromise()
        .then(response => response.json());
  }
}

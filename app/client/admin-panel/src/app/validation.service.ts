import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'

import { environment } from '../environments/environment';

@Injectable()
export class ValidationService {

  private url = environment.apiUrl + 'api/loginvalidation';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) { }

  validateUser(username, password) {
    return this.http
      .post(this.url + '/login', JSON.stringify({username, password}), {headers: this.headers})
        .toPromise()
        .then(response => response.json());  
  }
}

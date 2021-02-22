import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessControl } from './access-control';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  apiURL = 'https://server.adiy.site';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // HttpClient API get() method => Fetch users list
  getUsers(): Observable<AccessControl> {
    return this.http.get<AccessControl>(this.apiURL + '/api/user/register')
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }

  // HttpClient API get() method => Fetch users
  getUser(id): Observable<AccessControl> {
    return this.http.get<AccessControl>(this.apiURL + '/api/user/register' + id)
        .pipe(
            retry(1),
            catchError(this.handleError)
        );
  }

  getUsersDesigns(payload) {
    return this.http.get(this.apiURL + '/api/files/user', payload);
  }


  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}

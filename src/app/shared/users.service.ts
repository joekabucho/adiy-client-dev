import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {dev} from '../config/dev';

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    // Define API
    apiURL = dev.connect;

     // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

    private loggedInStatus = JSON.parse(localStorage.getItem('LoggedIn') || 'false');

    constructor(private http: HttpClient) { }


    /*========================================
      CRUD Methods for consuming RESTful API
    =========================================*/
    CreateUsers(data): Observable<Users> {
        return this.http.post<Users>(this.apiURL + '/api/user/register', JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
      }
    
      // GET
      // tslint:disable-next-line:variable-name
      GetUsers(_id): Observable<Users> {
        return this.http.get<Users>(this.apiURL + '/api/user/getAll/' + _id)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
      }
    
      // GET
      GetUserss(): Observable<Users> {
        return this.http.get<Users>(this.apiURL + '/api/user/getAll/')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
      }
    
      // PUT
      // tslint:disable-next-line:variable-name
      UpdateUsers(_id, data): Observable<Users> {
        return this.http.patch<Users>(this.apiURL + '/api/user/patch/' + _id, JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
      }



    // HttpClient API get() method => Fetch employee
    // tslint:disable-next-line:variable-name
    // HttpClient API get() method => Fetch employees list
    getUsers(): Observable<Users> {
        return this.http.get<Users>(this.apiURL + '/api/user/getAll')
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
    }
    // tslint:disable-next-line:variable-name
    DeleteUsers(_id) {
        return this.http.delete<Users>(this.apiURL + '/api/user/delete/' + _id, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
    }



    // Error handling
    errorHandl(error) {
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

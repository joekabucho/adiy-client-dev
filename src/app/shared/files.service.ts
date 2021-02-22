import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Files } from './files';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {dev} from '../config/dev';

@Injectable({
  providedIn: 'root'
})
export class FilesService {


   // Base url
 baseurl = 'https://server.adiy.site';
 // tslint:disable-next-line:variable-name
base_path = 'http://localhost:8000/api/files';

constructor(private http: HttpClient) { }

// Http Headers
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

    createFiles(data): Observable<Files> {
        return this.http.post<Files>(this.baseurl + '/api/files/', JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            );
    }
    createItem(item): Observable<Files> {
        return this.http
            .post<Files>(this.base_path, JSON.stringify(item), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.errorHandl)
            )
    }

// GET
// tslint:disable-next-line:variable-name
GetFiless(_id): Observable<Files> {
  return this.http.get<Files>(this.baseurl + '/api/files/' + _id)
      .pipe(
          retry(1),
          catchError(this.errorHandl)
      );
}

// GET
GetFiles(): Observable<Files> {
  return this.http.get<Files>(this.baseurl + '/api/files/')
      .pipe(
          retry(1),
          catchError(this.errorHandl)
      );
}

// DELETE
// tslint:disable-next-line:variable-name
DeleteFiles(_id) {
  return this.http.delete<Files>(this.baseurl + '/api/files/delete/' + _id, this.httpOptions)
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
  console.log(errorMessage);
  return throwError(errorMessage);
}
}

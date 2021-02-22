import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artworks } from './artworks';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {dev} from '../config/dev';

@Injectable({
  providedIn: 'root'
})
export class ArtWorksService {


  // Base url
  baseurl = 'https://server.adiy.site';
  // tslint:disable-next-line:variable-name
  base_path = 'https://server.adiy.site/api/files';

  constructor(private http: HttpClient) { }

// Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


// GET
// tslint:disable-next-line:variable-name
  GetFiless(_id): Observable<Artworks> {
    return this.http.get<Artworks>(this.baseurl + '/api/artworks/' + _id)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }

// GET
  GetFiles(): Observable<Artworks> {
    return this.http.get<Artworks>(this.baseurl + '/api/artworks/')
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }

  createArtwork(data): Observable<Artworks> {
    return this.http.post<Artworks>(this.baseurl + '/api/artworks/', JSON.stringify(data), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }
// DELETE
// tslint:disable-next-line:variable-name
  DeleteFiles(_id) {
    return this.http.delete<Artworks>(this.baseurl + '/api/artworks/' + _id, this.httpOptions)
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

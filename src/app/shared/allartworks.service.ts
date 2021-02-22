import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Allartworks } from './allartworks';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllartworksService {

  // Base url
  baseurl = 'https://sanaa.adiy.site/api/artwork';
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
  GetFiless(id): Observable<Allartworks> {
    return this.http.get<Allartworks>(this.baseurl + id)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
         );
  }

// GET
  GetFiles(): Observable<Allartworks> {
    return this.http.get<Allartworks>(this.baseurl )
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }

  createArtwork(data): Observable<Allartworks> {
    return this.http.post<Allartworks>(this.baseurl , JSON.stringify(data), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }
// DELETE
// tslint:disable-next-line:variable-name
  DeleteFiles(id) {
    return this.http.delete<Allartworks>(this.baseurl + id, this.httpOptions)
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blob } from './blob';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  // Base url
  baseurl = 'https://sanaa.adiy.site/api/blob';
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
  GetFiless(id): Observable<Blob> {
    return this.http.get<Blob>(this.baseurl + id)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }

// GET
  GetBlobFiles(): Observable<Blob> {
    return this.http.get<Blob>(this.baseurl )
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }

  createArtwork(data): Observable<Blob> {
    return this.http.post<Blob>(this.baseurl , JSON.stringify(data), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.errorHandl)
        );
  }
// DELETE
// tslint:disable-next-line:variable-name
  DeleteFiles(id) {
    return this.http.delete<Blob>(this.baseurl + id, this.httpOptions)
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


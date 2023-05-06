import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Setting
  addSettingApi(Setting: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.SettingEndpoint, Setting)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Setting
  getSettingApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SettingEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Setting by id
  updateSettingApi(id: number | string, Setting: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.SettingEndpoint + `/${id}`, Setting)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Setting by id
  deleteSettingApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.SettingEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

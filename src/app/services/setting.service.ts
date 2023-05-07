import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../others/api-paths.enum';
import { Setting } from '../models/setting';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //View Setting One
  getSettingApi(id: number | string): Observable<Setting> {
    return this.httpClient
      .get<Setting>(this.BASE_URL + ApiPaths.SettingEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //Update Setting by id
  updateSettingApi(id: number, Setting: any): Observable<Setting[]> {
    return this.httpClient
      .put<Setting[]>(
        this.BASE_URL + ApiPaths.SettingEndpoint + `/${id}`,
        Setting
      )
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

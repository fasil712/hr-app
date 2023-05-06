import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Salary
  addSalaryApi(Salary: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.SalaryEndpoint, Salary)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Salary
  getSalaryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SalaryEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Salary by id
  updateSalaryApi(id: number | string, Salary: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.SalaryEndpoint + `/${id}`, Salary)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Salary by id
  deleteSalaryApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.SalaryEndpoint + `/${id}`)
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

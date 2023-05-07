import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../others/api-paths.enum';
import { Salary } from '../models/salary';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Salary
  addSalaryApi(salary: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.SalaryEndpoint, salary)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Salary
  getSalaryApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SalaryEndpoint)
      .pipe(catchError(this.errorHandler));
  }

  //View list of Salary
  getSalaryByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.SalaryEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View Salary by id
  updateSalaryApi(salary: Salary): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.SalaryEndpoint + `/${salary.id}`, salary)
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Candidate
  addCandidateApi(Candidate: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.CandidateEndpoint, Candidate)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Candidate
  getCandidateApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.CandidateEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Candidate by id
  updateCandidateApi(id: number | string, Candidate: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.CandidateEndpoint + `/${id}`, Candidate)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Candidate by id
  deleteCandidateApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.CandidateEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  //post Add Employee
  addEmployeeApi(Employee: any): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.EmployeeEndpoint, Employee)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Employee
  getEmployeeApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.EmployeeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Employee by id
  updateEmployeeApi(id: number | string, Employee: any): Observable<any> {
    return this.httpClient
      .put(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`, Employee)
      .pipe(catchError(this.errorHandler));
  }
  //Delete Employee by id
  deleteEmployeeApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`)
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

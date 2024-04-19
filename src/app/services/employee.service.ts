import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiPaths } from '../others/api-paths.enum';
import { Employee } from '../models/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Employee
  addEmployeeApi(employee: Employee): Observable<Employee[]> {
    return this.httpClient
      .post<Employee[]>(this.BASE_URL + ApiPaths.EmployeeEndpoint, employee)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Employee
  getEmployeeApi(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(this.BASE_URL + ApiPaths.EmployeeEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Employee by id
  updateEmployeeApi(
    id: number | string,
    employee: Employee
  ): Observable<Employee[]> {
    return this.httpClient
      .put<Employee[]>(
        this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`,
        employee
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete Employee by id
  deleteEmployeeApi(id: number | string): Observable<Employee[]> {
    return this.httpClient
      .delete<Employee[]>(this.BASE_URL + ApiPaths.EmployeeEndpoint + `/${id}`)
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

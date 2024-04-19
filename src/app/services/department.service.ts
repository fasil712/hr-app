import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiPaths } from '../others/api-paths.enum';
import { Department } from '../models/department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //post Add Department
  addDepartmentApi(department: Department): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + ApiPaths.DepartmentEndpoint, department)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Department By Id
  getDepartmentByIdApi(id: number | string): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DepartmentEndpoint + `/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Department
  getDepartmentApi(): Observable<any> {
    return this.httpClient
      .get(this.BASE_URL + ApiPaths.DepartmentEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //View Department by id
  updateDepartmentApi(department: Department): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + ApiPaths.DepartmentEndpoint + `/${department.id}`,
        department
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete Department by id
  deleteDepartmentApi(id: number | string): Observable<any> {
    return this.httpClient
      .delete(this.BASE_URL + ApiPaths.DepartmentEndpoint + `/${id}`)
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

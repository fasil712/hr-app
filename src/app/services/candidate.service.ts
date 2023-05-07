import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiPaths } from '../others/api-paths.enum';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  //Add Candidate
  addCandidateApi(candidate: Candidate): Observable<Candidate[]> {
    return this.httpClient
      .post<Candidate[]>(this.BASE_URL + ApiPaths.CandidateEndpoint, candidate)
      .pipe(catchError(this.errorHandler));
  }
  //View list of Candidate
  getCandidateApi(): Observable<Candidate[]> {
    return this.httpClient
      .get<Candidate[]>(this.BASE_URL + ApiPaths.CandidateEndpoint)
      .pipe(catchError(this.errorHandler));
  }
  //Update Candidate by id
  updateCandidateApi(
    id: number | string,
    candidate: Candidate
  ): Observable<Candidate[]> {
    return this.httpClient
      .put<Candidate[]>(
        this.BASE_URL + ApiPaths.CandidateEndpoint + `/${id}`,
        candidate
      )
      .pipe(catchError(this.errorHandler));
  }
  //Delete Candidate by id
  deleteCandidateApi(id: number | string): Observable<Candidate[]> {
    return this.httpClient
      .delete<Candidate[]>(
        this.BASE_URL + ApiPaths.CandidateEndpoint + `/${id}`
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

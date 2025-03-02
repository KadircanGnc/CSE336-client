import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetBoardings_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class BoardingsService {
  private apiUrl = 'http://localhost:8080/api/v1/boardings'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBoardings(queryParams?: {
    passengerIds?: string[];
    passengerTypes?: string[];
    busStopIds?: string[];
    tripIds?: string[];
    boardingTypeIds?: string[];
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetBoardings_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.passengerIds) {
        queryParams.passengerIds.forEach(id => {
          params = params.append('passengerIds', id);
        });
      }
      if (queryParams.passengerTypes) {
        queryParams.passengerTypes.forEach(type => {
          params = params.append('passengerTypes', type);
        });
      }
      if (queryParams.busStopIds) {
        queryParams.busStopIds.forEach(id => {
          params = params.append('busStopIds', id);
        });
      }
      if (queryParams.tripIds) {
        queryParams.tripIds.forEach(id => {
          params = params.append('tripIds', id);
        });
      }
      if (queryParams.boardingTypeIds) {
        queryParams.boardingTypeIds.forEach(id => {
          params = params.append('boardingTypeIds', id);
        });
      }
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetBoardings_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  getBoardingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBoarding(boarding: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, boarding);
  }

  updateBoarding(id: number, boarding: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, boarding);
  }

  deleteBoarding(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

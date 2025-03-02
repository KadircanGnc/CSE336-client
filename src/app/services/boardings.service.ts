import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetBoardings_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class BoardingsService {
  private apiUrl = 'http://localhost:8080/api/v1/boardings'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBoardings(): Observable<PaginatedResponse<GetBoardings_WC_MLS_Response>> {
    return this.http.get<PaginatedResponse<GetBoardings_WC_MLS_Response>>(`${this.apiUrl}`);
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

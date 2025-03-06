import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBoarding_WC_MLS_Request, CreateRoutes_WC_MLS_Request, GetBoardings_WC_MLS_Response, GetRoutes_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  private apiUrl = 'http://localhost:8080/api/v1/routes'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getRoutes(queryParams?: {    
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetRoutes_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetRoutes_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  getroutesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRoutes(request: CreateRoutes_WC_MLS_Request): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, request
    );
  }

  updateRoutes(id: string, boarding: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, boarding);
  }

  deleteRoutes(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

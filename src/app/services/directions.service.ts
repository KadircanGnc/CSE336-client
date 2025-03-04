import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDirection_WC_MLS_Request, GetDirections_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DirectionsService {


  private apiUrl = 'http://localhost:8080/api/v1/directions'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getDirections(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetDirections_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetDirections_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreateDirection_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }
}
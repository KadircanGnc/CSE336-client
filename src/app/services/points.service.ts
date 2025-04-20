import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePoints_WC_MLS_Request, GetPoints_WC_MLS_Response, PaginatedResponse, UpdatePointRequest } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PointsService {

  private apiUrl = 'http://localhost:8080/api/v1/points'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getPoints(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetPoints_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetPoints_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreatePoints_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  update(id: string, request: UpdatePointRequest) {
      return this.http.put(`${this.apiUrl}/${id}`, request);
    }
}
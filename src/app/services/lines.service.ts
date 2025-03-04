import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLine_WC_MLS_Request, GetLines_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class LinesService {


  private apiUrl = 'http://localhost:8080/api/v1/lines'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getLines(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetLines_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetLines_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreateLine_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }
}
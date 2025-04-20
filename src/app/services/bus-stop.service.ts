import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  CreateBusStop_WC_MLS_Request, GetBusStops_WC_MLS_Response, PaginatedResponse, UpdateBusStopRequest } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class BusStopService {


  private apiUrl = 'http://localhost:8080/api/v1/bus-stops'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBusStops(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetBusStops_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetBusStops_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreateBusStop_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  update(id: string, request: UpdateBusStopRequest) {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }
}
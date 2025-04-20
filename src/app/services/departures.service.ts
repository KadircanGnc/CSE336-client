import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDepartures_WC_MLS_Request,
  GetDepartures_WC_MLS_Response,
  PaginatedResponse,
  UpdateDepartureRequest,
} from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DeparturesService {
  private apiUrl = 'http://localhost:8080/api/v1/departures'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getDepartures(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetDepartures_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetDepartures_WC_MLS_Response>>(
      `${this.apiUrl}`,
      { params }
    );
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreateDepartures_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }

  update(id: string, request: UpdateDepartureRequest) {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }
}

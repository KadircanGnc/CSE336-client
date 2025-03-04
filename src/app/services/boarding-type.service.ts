import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBoarding_WC_MLS_Request, CreateBoardingType_WC_MLS_Request, GetBoardings_WC_MLS_Response, GetBoardingTypes_WC_MLS_Response, PaginatedResponse } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class BoardingTypeService {


  private apiUrl = 'http://localhost:8080/api/v1/boarding-types'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getBoardingTypes(queryParams?: {
    page?: number;
    size?: number;
  }): Observable<PaginatedResponse<GetBoardingTypes_WC_MLS_Response>> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page !== undefined) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.size !== undefined) {
        params = params.set('size', queryParams.size.toString());
      }
    }

    return this.http.get<PaginatedResponse<GetBoardingTypes_WC_MLS_Response>>(`${this.apiUrl}`, { params });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  create(request: CreateBoardingType_WC_MLS_Request) {
    return this.http.post(`${this.apiUrl}`, request);
  }
}
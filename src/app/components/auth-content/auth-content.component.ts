import { Component } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css'],
  imports: [CommonModule]
})
export class AuthContentComponent {
  data: string[] = [];
  
  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.axiosService.request(
        "GET",
        "/messages",
        {}).then(
        (response) => {
            this.data = response.data;
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                this.axiosService.setAuthToken(null);
            } else {
                this.data = error.response.code;
            }

        }
    );
  }

}
import { Component } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../pages/login-form/login-form.component';
import { AuthContentComponent } from '../auth-content/auth-content.component';
import { ButtonsComponent } from '../login-buttons/login-buttons.component';
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  imports: [CommonModule, LoginFormComponent, DashboardComponent, AuthContentComponent, ButtonsComponent, DashboardComponent],
})
export class ContentComponent {
	componentToShow: string = "welcome";

	constructor(private axiosService: AxiosService) { }

	showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
		);

	}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
		        this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
		        this.axiosService.setAuthToken(null);
		        this.componentToShow = "welcome";
		    }
		);
	}

}
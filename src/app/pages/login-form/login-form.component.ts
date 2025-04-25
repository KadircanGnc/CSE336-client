import { CommonModule } from '@angular/common';
import { EventEmitter, Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginFormComponent {
  @Output() onSubmitLoginEvent = new EventEmitter();
  @Output() onSubmitRegisterEvent = new EventEmitter();

  active: string = 'login';
  firstName: string = '';
  lastName: string = '';
  login: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private http: HttpClient) {}

  onLoginTab(): void {
    this.active = 'login';
    this.loginError = null;
  }

  onRegisterTab(): void {
    this.active = 'register';
    this.loginError = null;
  }

  onSubmitLogin(): void {
    this.loginError = null;

    const loginData = { login: this.login, password: this.password };
    this.http.post<UserDto>('http://localhost:8080/login', loginData).subscribe(
      (response: UserDto) => {
        const token = response.token;

        localStorage.setItem('auth_token', token);

        console.log('Login successful:', response);
        console.log('Token saved:', token);
        console.log(
          'Retrieved from localStorage:',
          localStorage.getItem('auth_token')
        );

        this.onSubmitLoginEvent.emit(response);
      },
      (error) => {
        if (error.error?.message) {
          this.loginError = error.error.message; // e.g., "User not found" or "Incorrect password"
          console.warn('Login error:', error.error.message);
        } else {
          this.loginError = 'Login failed. Please try again.';
          console.error('Unexpected login error:', error);
        }
      }
    );
  }

  onSubmitRegister(): void {
    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
    };
    this.http.post('http://localhost:8080/register', registerData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.onSubmitLoginEvent.emit(response);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
    this.onSubmitRegisterEvent.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      login: this.login,
      password: this.password,
    });
  }
}

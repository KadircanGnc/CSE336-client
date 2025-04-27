import { CommonModule, NgIf } from '@angular/common';
import { EventEmitter, Component, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../types/types';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

//@Injectable({
//  providedIn: 'root',
//})
@Component({
  selector: 'app-login-form',
  standalone: true,
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

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  private message: NzMessageService = inject(NzMessageService);

  onLoginTab(): void {
    this.active = 'login';
    this.loginError = null;
  }

  onRegisterTab(): void {
    this.active = 'register';
    this.loginError = null;
  }

  onLoginSuccess(token: string) {
    this.authService.login(token); // <- trigger login
    this.router.navigate(['/dashboard']);
  }

  onSubmitLogin(): void {
    this.loginError = null;

    const loginData = { login: this.login, password: this.password };
    this.http.post<UserDto>('http://localhost:8080/login', loginData).subscribe(
      (response: UserDto) => {
        const token = response.token;

        // Call the login method from AuthService to store the token
        this.onLoginSuccess(token);
        //localStorage.setItem('auth_token', token);

        console.log('Login successful:', response);
        console.log('Token saved:', token);
        console.log(
          'Retrieved from localStorage:',
          localStorage.getItem('auth_token')
        );

        this.onSubmitLoginEvent.emit(response);
        this.router.navigate(['/dashboard']);
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
    if (this.firstName && this.lastName && this.login && this.password) {
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
          this.message.success('Successfully registered! Please log in.'); // show success toast
          this.active = 'login'; // switch to login tab
        },
        (error) => {
          if (error.error?.message === 'Login already exists') {
            this.message.error('Username already exists'); // <-- show validation error
          } else {
            this.message.error('Registration failed. Please try again.');
          }
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
}

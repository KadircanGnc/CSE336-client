import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  private loggedIn = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimeout: any;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(token: string) {    
    localStorage.setItem('auth_token', token);
    this.loggedIn.next(true);
    this.startAutoLogoutTimer(token);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn.next(false);
    clearTimeout(this.tokenExpirationTimeout); // Clear timeout
    this.router.navigate(['/app-login-form']);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('auth_token');
    //this.loggedIn.next(!!token);
    if (token && !this.isTokenExpired(token)) {
      this.loggedIn.next(true);
      this.startAutoLogoutTimer(token);
    } else {
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // exp is seconds, JS expects ms
      return Date.now() > expiryTime;
    } catch (e) {
      console.error('Invalid token', e);
      return true;
    }
  }

  private startAutoLogoutTimer(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const timeLeft = expiryTime - Date.now();

      this.tokenExpirationTimeout = setTimeout(() => {
        this.logout();
        alert('Session expired. Please login again.');
      }, timeLeft);
    } catch (e) {
      console.error('Failed to parse token', e);
      this.logout();
    }
  }
}


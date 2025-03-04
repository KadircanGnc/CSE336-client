/* filepath: /c:/Users/Mert/my-angular-app/src/app/services/theme.service.ts */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<ThemeMode>(this.getInitialTheme());
  public theme$: Observable<ThemeMode> = this.themeSubject.asObservable();

  constructor() {
    this.setTheme(this.themeSubject.value);
  }

  private getInitialTheme(): ThemeMode {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference if no saved theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light theme
    return 'light';
  }

  public getTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  public setTheme(theme: ThemeMode): void {
    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
    
    // Apply theme to document body
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  public toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
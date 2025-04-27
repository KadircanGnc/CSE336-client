import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { CommonModule} from '@angular/common';
import { AuthService } from './services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ThemeToggleComponent, NzIconModule, NzLayoutModule, NzMenuModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private message: NzMessageService) {}

  isCollapsed = false;
  loggedIn = false;
  theme = 'light';

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(status => {
      this.loggedIn = status;
    });
    //const token = localStorage.getItem('auth_token');
    //this.loggedIn = !!token;
    this.authService.checkLoginStatus();
  }

  handleLoginSuccess(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.authService.logout();                  
    this.router.navigate(['/app-login-form']); // Redirect to login page
    this.message.success('Successfully logged out!');
  }
}

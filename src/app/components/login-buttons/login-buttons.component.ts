import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-buttons',
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.css']
})
export class ButtonsComponent {
	@Output() loginEvent = new EventEmitter();
	@Output() logoutEvent = new EventEmitter();
}

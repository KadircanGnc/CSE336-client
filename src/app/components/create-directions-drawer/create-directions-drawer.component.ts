import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDirection_WC_MLS_Request } from '../../types/types';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  selector: 'app-create-directions-drawer',
  templateUrl: './create-directions-drawer.component.html',
  styleUrl: './create-directions-drawer.component.css',
})
export class CreateDirectionsDrawerComponent {
  visible = false;
  @Output() onSubmit = new EventEmitter<{
    request: CreateDirection_WC_MLS_Request;
  }>();
  request: CreateDirection_WC_MLS_Request = {
    name: ''
  };

  constructor() {}

  // Update submit method to emit the request object
  submit(): void {
    try {
      console.log('Submitting request:', this.request);

      this.onSubmit.emit({ request: this.request });
      this.close();
    } catch (error) {
      console.error('Error in submit:', error);
    }
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.resetRequest();
    this.visible = false;
  }

  resetRequest(): void {
    this.request = {
      name: ''
    };
  }
}

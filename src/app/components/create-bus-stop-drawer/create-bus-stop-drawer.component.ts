import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateBusStop_WC_MLS_Request } from '../../types/types';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  selector: 'app-create-bus-stop-drawer',
  templateUrl: './create-bus-stop-drawer.component.html',
  styleUrl: './create-bus-stop-drawer.component.css',
})
export class CreateBusStopDrawerComponent {
  visible = false;
  @Output() onSubmit = new EventEmitter<{
    request: CreateBusStop_WC_MLS_Request;
  }>();
  request: CreateBusStop_WC_MLS_Request = {
    stopName: '',
    latitude: 0,
    longitude: 0,
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
      stopName: '',
      latitude: 0,
      longitude: 0,
    };
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreatePoints_WC_MLS_Request } from '../../types/types';
import { RoutesSelectComponent } from '../routes-select/routes-select.component';

@Component({
  selector: 'app-create-points-drawer',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    RoutesSelectComponent
  ],
  templateUrl: './create-points-drawer.component.html',
  styleUrl: './create-points-drawer.component.css',
})
export class CreatePointsDrawerComponent {
  visible = false;
  @Output() onSubmit = new EventEmitter<{
    request: CreatePoints_WC_MLS_Request;
  }>();
  request: CreatePoints_WC_MLS_Request = {
    routeId: '',
    sequence: 0,
    latitude: 0,
    longitude: 0    
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
      routeId: '',
      sequence: 0,
      latitude: 0,
      longitude: 0 
    };
  }
}

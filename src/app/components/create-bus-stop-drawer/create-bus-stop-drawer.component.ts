import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateBusStop_WC_MLS_Request, GetBusStops_WC_MLS_Response, UpdateBoardingTypeRequest, UpdateBusStopRequest } from '../../types/types';

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
  @Input() selectedItem: GetBusStops_WC_MLS_Response | null = null;
  @Output() onCreate = new EventEmitter<{ request: CreateBusStop_WC_MLS_Request }>();
  @Output() onUpdate = new EventEmitter<{ id: string; request: UpdateBusStopRequest }>();
  id: string | null = null;
  request: CreateBusStop_WC_MLS_Request = {
    stopName: '',
    latitude: 0,
    longitude: 0,
  };

  constructor() {}

  
  submit(): void {
    if (this.selectedItem) {
      this.update(); // Call update if we are editing
    } else {
      this.create(); // Call create if we are adding new
    }
  }

  create(): void {
    try {
      console.log('Creating request:', this.request);
      this.onCreate.emit({ request: this.request });
      this.close();
    } catch (error) {
      console.error('Error in create:', error);
    }
  }

  update(): void {
    if (this.selectedItem) {
      this.onUpdate.emit({ id: this.selectedItem.id, request: {
        stopName: this.request.stopName,
        latitude: this.request.latitude,
        longitude: this.request.longitude        
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        stopName: this.selectedItem.stopName,
        latitude: this.selectedItem.latitude,
        longitude: this.selectedItem.longitude
      };
    } else {
      this.resetRequest();
    }
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

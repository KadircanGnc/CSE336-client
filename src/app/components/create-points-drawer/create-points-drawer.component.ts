import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreatePoints_WC_MLS_Request, GetPoints_WC_MLS_Response, UpdatePointRequest } from '../../types/types';
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
  @Input() selectedItem: GetPoints_WC_MLS_Response | null = null;
    @Output() onCreate = new EventEmitter<{
      request: CreatePoints_WC_MLS_Request;
    }>();
    @Output() onUpdate = new EventEmitter<{
      id: string;
      request: UpdatePointRequest;
    }>();
    id: string | null = null;
  request: CreatePoints_WC_MLS_Request = {
    routeId: '',
    sequence: 0,
    latitude: 0,
    longitude: 0    
  };

  constructor() {}

  // Update submit method to emit the request object
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
        routeId: this.request.routeId,
        sequence: this.request.sequence,
        latitude: this.request.latitude,
        longitude: this.request.longitude      
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        routeId: this.selectedItem.route.id,
        sequence: this.selectedItem.sequence,
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
      routeId: '',
      sequence: 0,
      latitude: 0,
      longitude: 0 
    };
  }
}

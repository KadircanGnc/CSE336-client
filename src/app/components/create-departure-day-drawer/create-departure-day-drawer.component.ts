import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartureDays_WC_MLS_Request, GetDepartureDays_WC_MLS_Response, UpdateDepartureDayRequest } from '../../types/types';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  selector: 'app-create-departure-day-drawer',
  templateUrl: './create-departure-day-drawer.component.html',
  styleUrl: './create-departure-day-drawer.component.css',
})
export class CreateDepartureDayDrawerComponent {
  visible = false;
  @Input() selectedItem: GetDepartureDays_WC_MLS_Response | null = null;
    @Output() onCreate = new EventEmitter<{
      request: CreateDepartureDays_WC_MLS_Request;
    }>();
    @Output() onUpdate = new EventEmitter<{
      id: string;
      request: UpdateDepartureDayRequest;
    }>();
    id: string | null = null;
  request: CreateDepartureDays_WC_MLS_Request = {
    day: ''
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
        day: this.request.day     
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        day: this.selectedItem.day
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
      day: ''
    };
  }
}

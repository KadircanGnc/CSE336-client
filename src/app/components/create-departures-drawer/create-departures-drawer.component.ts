import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartures_WC_MLS_Request, GetDepartures_WC_MLS_Response, UpdateDepartureRequest } from '../../types/types';
import { DepartureDaysSelectComponent } from '../departure-days-select/departure-days-select.component';
import { RoutesSelectComponent } from '../routes-select/routes-select.component';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    DepartureDaysSelectComponent,
    RoutesSelectComponent
  ],
  selector: 'app-create-departures-drawer',
  templateUrl: './create-departures-drawer.component.html',
  styleUrl: './create-departures-drawer.component.css',
})
export class CreateDeparturesDrawerComponent {
  visible = false;
  @Input() selectedItem: GetDepartures_WC_MLS_Response | null = null;
    @Output() onCreate = new EventEmitter<{
      request: CreateDepartures_WC_MLS_Request;
    }>();
    @Output() onUpdate = new EventEmitter<{
      id: string;
      request: UpdateDepartureRequest;
    }>();
    id: string | null = null;
  request: CreateDepartures_WC_MLS_Request = {
    departureDayId: '',
    routeId: ''
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
        departureDayId: this.request.departureDayId,
        routeId: this.request.routeId,       
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        departureDayId: this.selectedItem.departureDay.id,
        routeId: this.selectedItem.route.id,
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
      departureDayId: '',
      routeId: ''
    };
  }
}

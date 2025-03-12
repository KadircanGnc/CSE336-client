import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDepartures_WC_MLS_Request } from '../../types/types';
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
  @Output() onSubmit = new EventEmitter<{
    request: CreateDepartures_WC_MLS_Request;
  }>();
  request: CreateDepartures_WC_MLS_Request = {
    departureDayId: '',
    routeId: ''
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
      departureDayId: '',
      routeId: ''
    };
  }
}

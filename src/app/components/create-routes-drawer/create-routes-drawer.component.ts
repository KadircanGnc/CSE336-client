import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateRoutes_WC_MLS_Request, GetRoutes_WC_MLS_Response, UpdateRouteRequest } from '../../types/types';
import { DirectionsSelectComponent } from '../directions-select/directions-select.component';
import { LinesSelectComponent } from '../lines-select/lines-select.component';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    LinesSelectComponent,
    DirectionsSelectComponent,
  ],
  selector: 'app-create-routes-drawer',
  templateUrl: './create-routes-drawer.component.html',
  styleUrl: './create-routes-drawer.component.css',
})
export class CreateRoutesDrawerComponent {
  visible = false;
  @Input() selectedItem: GetRoutes_WC_MLS_Response | null = null;
  @Output() onCreate = new EventEmitter<{
    request: CreateRoutes_WC_MLS_Request;
  }>();
  @Output() onUpdate = new EventEmitter<{
    id: string;
    request: UpdateRouteRequest;
  }>();
  id: string | null = null;
  request: CreateRoutes_WC_MLS_Request = {
    directionId: '',
    lineId: '',
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
        directionId: this.request.directionId,
        lineId: this.request.lineId,      
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        directionId: this.selectedItem.direction.id,
        lineId: this.selectedItem.line.id,
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
      directionId: '',
      lineId: '',
    };
  }
}

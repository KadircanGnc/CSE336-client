import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateRoutes_WC_MLS_Request } from '../../types/types';
import { DirectionsSelectComponent } from "../directions-select/directions-select.component";
import { LinesSelectComponent } from "../lines-select/lines-select.component";


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
    DirectionsSelectComponent
],
  selector: 'app-create-routes-drawer',
  templateUrl: './create-routes-drawer.component.html',
  styleUrl: './create-routes-drawer.component.css'
})
export class CreateRoutesDrawerComponent {
  visible = false;
  @Output() onSubmit = new EventEmitter<{ request: CreateRoutes_WC_MLS_Request }>();
  request: CreateRoutes_WC_MLS_Request = {
    directionId: "",
    lineId: ""
  };

  constructor() { }
  
  // Update submit method to emit the request object
  submit(): void {
    try {
      console.log('Submitting request:', this.request);

      // Ensure all number fields are actually numbers
      this.request.directionId = String(this.request.directionId);
      this.request.lineId = String(this.request.lineId);
      

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
      directionId: "",
      lineId: ""
    };
  }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateBoarding_WC_MLS_Request } from '../../types/types';
import { BoardingTypeSelectComponent } from '../boarding-type-select/boarding-type-select.component';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';


@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    FormsModule,
    BoardingTypeSelectComponent,
    CommonModule    
  ],
  selector: 'app-create-boarding-drawer',
  templateUrl: './create-boarding-drawer.component.html',
  styleUrl: './create-boarding-drawer.component.css'
})
export class CreateBoardingDrawerComponent {
  visible = false;
  @Output() onSubmit = new EventEmitter<{ request: CreateBoarding_WC_MLS_Request }>();
  request: CreateBoarding_WC_MLS_Request = {
    passengerId: "",
    passengerType: "",
    boardingTime: 0,
    busStopId: "",
    latitude: 0,
    longitude: 0,
    tripId: "",
    boardingTypeId: ""
  };
  displayDate: Date | null = null;
  constructor() { }

  // Convert date to timestamp

  onDateChange(result: Date): void {
    // Handle the date change here
    // Convert Date object to timestamp (milliseconds since epoch)
    this.request.boardingTime = result.getTime();
  }

  // Update submit method to emit the request object
  submit(): void {
    try {
      console.log('Submitting request:', this.request);

      // Ensure all number fields are actually numbers
      this.request.latitude = Number(this.request.latitude);
      this.request.longitude = Number(this.request.longitude);
      this.request.boardingTime = Number(this.request.boardingTime) || 0;

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
      passengerId: "",
      passengerType: "",
      boardingTime: 0,
      busStopId: "",
      latitude: 0,
      longitude: 0,
      tripId: "",
      boardingTypeId: ""
    };
  }
}
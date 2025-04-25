import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateBoarding_WC_MLS_Request, GetBoardings_WC_MLS_Response, UpdateBoardingRequest } from '../src/app/types/types';
import { BoardingTypeSelectComponent } from '../src/app/components/boarding-type-select/boarding-type-select.component';
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
    CommonModule,
  ],
  selector: 'app-create-boarding-drawer',
  templateUrl: './create-boarding-drawer.component.html',
  styleUrl: './create-boarding-drawer.component.css',
})
export class CreateBoardingDrawerComponent {
  visible = false;
  @Input() selectedItem: GetBoardings_WC_MLS_Response | null = null;
  @Output() onCreate = new EventEmitter<{
    request: CreateBoarding_WC_MLS_Request;
  }>();
  @Output() onUpdate = new EventEmitter<{
    id: string;
    request: UpdateBoardingRequest;
  }>();
  id: string | null = null;
  request: CreateBoarding_WC_MLS_Request = {
    passengerId: '',
    passengerType: '',
    boardingTime: 0,
    busStopId: '',
    latitude: 0,
    longitude: 0,
    tripId: '',
    boardingTypeId: '',
  };
  displayDate: Date | null = null;
  constructor() {}

  // Convert date to timestamp

  onDateChange(result: Date): void {
    // Handle the date change here
    // Convert Date object to timestamp (milliseconds since epoch)
    this.request.boardingTime = result.getTime();
  }

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
        passengerId: this.request.passengerId,
        passengerType: this.request.passengerType,
        boardingTime: this.request.boardingTime,
        busStopId: this.request.busStopId,
        latitude: this.request.latitude,
        longitude: this.request.longitude,
        tripId: this.request.tripId,
        boardingTypeId: this.request.boardingTypeId,      
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        passengerId: this.selectedItem.passengerId,
        passengerType: this.selectedItem.passengerType,
        boardingTime: this.selectedItem.boardingTime,
        busStopId: this.selectedItem.busStopId,
        latitude: this.selectedItem.latitude,
        longitude: this.selectedItem.longitude,
        tripId: this.selectedItem.tripId,
        boardingTypeId: this.selectedItem.boardingType.id,
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
      passengerId: '',
      passengerType: '',
      boardingTime: 0,
      busStopId: '',
      latitude: 0,
      longitude: 0,
      tripId: '',
      boardingTypeId: '',
    };
  }
}

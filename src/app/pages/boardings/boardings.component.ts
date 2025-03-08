import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingsService } from '../../services/boardings.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateBoarding_WC_MLS_Request, GetBoardings_WC_MLS_Response } from '../../types/types';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateBoardingDrawerComponent } from '../../components/create-boarding-drawer/create-boarding-drawer.component';
import { UnixTimestampPipe } from '../../utils/UnixTimestampPipe';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-boardings',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateBoardingDrawerComponent, UnixTimestampPipe, CommonModule],
  templateUrl: './boardings.component.html',
  styleUrls: ['./boardings.component.css'],
})
export class BoardingsComponent implements OnInit {
  boardings: GetBoardings_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  passengerIds: string[] = [];
  passengerTypes: string[] = [];
  busStopIds: string[] = [];
  tripIds: string[] = [];
  boardingTypeIds: string[] = [];
  private readonly boardingsService = inject(BoardingsService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetBoardings_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();
  showFilters = false;

  ngOnInit(): void {
    this.loadBoardings();
  }

  loadBoardings(): void {
    this.boardingsService.getBoardings({
      passengerIds: this.passengerIds,
      passengerTypes: this.passengerTypes,
      busStopIds: this.busStopIds,
      tripIds: this.tripIds,
      boardingTypeIds: this.boardingTypeIds,
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.boardings = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.boardingsService.deleteBoarding(id).subscribe(() => {
        this.loadBoardings();
      });
    });
  }

  createBoarding(request: CreateBoarding_WC_MLS_Request): void {
    this.boardingsService.createBoarding({
      boardingTime: request.boardingTime,
      passengerId: request.passengerId,
      boardingTypeName: request.boardingTypeName,
      busStopId: request.busStopId,
      latitude: request.latitude,
      longitude: request.longitude,
      passengerType: request.passengerType,
      tripId: request.tripId,
    }).subscribe(() => {
      this.loadBoardings();
    })
  }

  addPassengerId(passengerId: string): void {
    if (passengerId.length === 0) {
      return;
    }

    if (this.passengerIds.find(id => id === passengerId)) {
      return;
    }
    this.passengerIds.push(passengerId);
    this.loadBoardings();
  }

  removePassengerId(passengerId: string): void {
    this.passengerIds = this.passengerIds.filter(id => id !== passengerId);
    this.loadBoardings();
  }

  clearPassengerIds(): void {
    this.passengerIds = [];
    this.loadBoardings();
  }


  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly GetBoardings_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadBoardings();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadBoardings();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

import { UpdateBoardingRequest } from './../../types/types';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardingsService } from '../../services/boardings.service';
import { HttpClientModule } from '@angular/common/http';
import {
  CreateBoarding_WC_MLS_Request,
  GetBoardings_WC_MLS_Response,
} from '../../types/types';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateBoardingDrawerComponent } from '../../components/create-boarding-drawer/create-boarding-drawer.component';
import { UnixTimestampPipe } from '../../utils/UnixTimestampPipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule, NzCheckboxOption } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-boardings',
  standalone: true,
  imports: [
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    CreateBoardingDrawerComponent,
    UnixTimestampPipe,
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzDividerModule,
  ],
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
  selectedItem: GetBoardings_WC_MLS_Response | null = null;
  @ViewChild(CreateBoardingDrawerComponent)
  createBoardingDrawer!: CreateBoardingDrawerComponent;
  private _showFilters = false;
  get showFilters(): boolean {
    return this._showFilters;
  }
  set showFilters(value: boolean) {
    this._showFilters = value;
    if (value) {
      this.allChecked = false;
      this.value = [];
      this.updateFilterOptions();
    }
  }

  // Checkbox
  isAllCheckedFirstChange = true;
  allChecked = false;
  value: Array<string | number> = [
    'passengerIds',
    'passengerTypes',
    'busStopIds',
    'tripIds',
    'boardingTypeIds',
  ];
  options: NzCheckboxOption[] = [
    { label: 'PassengerIds', value: 'passengerIds' },
    { label: 'PassengerTypes', value: 'passengerTypes' },
    { label: 'BusStopIds', value: 'busStopIds' },
    { label: 'TripIds', value: 'tripIds' },
    { label: 'BoardingTypeIds', value: 'boardingTypeIds' },
  ];

  ngOnInit(): void {
    this.updateFilterOptions();
    this.loadBoardings();
  }

  loadBoardings(): void {
    this.boardingsService
      .getBoardings({
        passengerIds: this.passengerIds,
        passengerTypes: this.passengerTypes,
        busStopIds: this.busStopIds,
        tripIds: this.tripIds,
        boardingTypeIds: this.boardingTypeIds,
        page: this.page - 1,
        size: this.pageSize,
      })
      .subscribe((data) => {
        this.boardings = data.content;
        this.totalElements = data.totalElements;
      });
  }

  updateSelected(): void {
    if (this.setOfCheckedId.size !== 1) {
      return; // Ensure only one item is selected
    }
  }

  createBoarding(request: CreateBoarding_WC_MLS_Request): void {
    this.boardingsService.createBoarding(request).subscribe(() => {
      this.loadBoardings();
    });
  }

  updateBoarding(id: string, request: UpdateBoardingRequest): void {
    this.boardingsService.update(id, request).subscribe(() => {
      this.loadBoardings();
      this.selectedItem = null;
      this.setOfCheckedId.clear();
    });
  }

  openUpdateDrawer(): void {
    if (this.setOfCheckedId.size === 1) {
      const selectedId = Array.from(this.setOfCheckedId)[0];
      this.selectedItem =
        this.boardings.find((item) => item.id === selectedId) || null;

      if (this.selectedItem) {
        this.createBoardingDrawer.selectedItem = { ...this.selectedItem }; // Pass selected item properly
        this.createBoardingDrawer.open();
      }
    }
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach((id) => {
      this.boardingsService.deleteBoarding(id).subscribe(() => {
        this.loadBoardings();
      });
    });
  }  

  addPassengerId(passengerId: string): void {
    if (passengerId.length === 0) {
      return;
    }

    if (this.passengerIds.find((id) => id === passengerId)) {
      return;
    }
    this.passengerIds.push(passengerId);
    this.loadBoardings();
  }

  removePassengerId(passengerId: string): void {
    this.passengerIds = this.passengerIds.filter((id) => id !== passengerId);
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
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange(
    $event: readonly GetBoardings_WC_MLS_Response[]
  ): void {
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
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  // Checkbox

  updateAllChecked(): void {
    if (!this.isAllCheckedFirstChange) {
      this.value = this.allChecked
        ? this.options.map((item) => item.value)
        : [];
    }
    this.isAllCheckedFirstChange = false;
    this.updateFilterOptions();
    this.loadBoardings();
  }

  updateSingleChecked(): void {
    this.allChecked = this.value.length === this.options.length;
    this.updateFilterOptions();
    this.loadBoardings();
  }

  updateFilterOptions(): void {
    if (this.value.includes('passengerIds')) {
      this.boardingsService.getPassengerIds().subscribe((data) => {
        this.passengerIds = data;
        this.loadBoardings();
      });
    } else {
      this.passengerIds = [];
    }

    if (this.value.includes('passengerTypes')) {
      this.boardingsService.getPassengerTypes().subscribe((data) => {
        this.passengerTypes = data;
        this.loadBoardings();
      });
    } else {
      this.passengerTypes = [];
    }

    if (this.value.includes('busStopIds')) {
      this.boardingsService.getBusStopIds().subscribe((data) => {
        this.busStopIds = data;
        this.loadBoardings();
      });
    } else {
      this.busStopIds = [];
    }

    if (this.value.includes('tripIds')) {
      this.boardingsService.getTripIds().subscribe((data) => {
        this.tripIds = data;
        this.loadBoardings();
      });
    } else {
      this.tripIds = [];
    }

    if (this.value.includes('boardingTypeIds')) {
      this.boardingsService.getBoardingTypeIds().subscribe((data) => {
        this.boardingTypeIds = data;
        this.loadBoardings();
      });
    } else {
      this.boardingTypeIds = [];
    }
  }
}

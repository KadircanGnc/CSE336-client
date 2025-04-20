import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateBusStopDrawerComponent } from '../../components/create-bus-stop-drawer/create-bus-stop-drawer.component';
import { BusStopService } from '../../services/bus-stop.service';
import {
  CreateBusStop_WC_MLS_Request,
  GetBusStops_WC_MLS_Response,
  UpdateBusStopRequest,
} from '../../types/types';

@Component({
  selector: 'app-bus-stop',
  imports: [
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    CreateBusStopDrawerComponent,
    CommonModule,
  ],
  templateUrl: './bus-stop.component.html',
  styleUrl: './bus-stop.component.css',
})
export class BusStopComponent implements OnInit {
  busStops: GetBusStops_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private busStopService = inject(BusStopService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetBusStops_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();
  selectedItem: GetBusStops_WC_MLS_Response | null = null;
  @ViewChild(CreateBusStopDrawerComponent)
  createBusStopDrawer!: CreateBusStopDrawerComponent;

  ngOnInit(): void {
    this.loadBusStops();
  }

  loadBusStops(): void {
    this.busStopService
      .getBusStops({
        page: this.page - 1,
        size: this.pageSize,
      })
      .subscribe((data) => {
        this.busStops = data.content;
        this.totalElements = data.totalElements;
      });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach((id) => {
      this.busStopService.delete(id).subscribe(() => {
        this.loadBusStops();
      });
    });
  }

  createBusStop(request: CreateBusStop_WC_MLS_Request): void {
    this.busStopService.create(request).subscribe(() => {
      this.loadBusStops();
    });
  }

  updateBusStop(id: string, request: UpdateBusStopRequest): void {
    this.busStopService.update(id, request).subscribe(() => {
      this.loadBusStops();
      this.selectedItem = null;
      this.setOfCheckedId.clear();
    });
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
    $event: readonly GetBusStops_WC_MLS_Response[]
  ): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadBusStops();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadBusStops();
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

  updateSelected(): void {
    if (this.setOfCheckedId.size !== 1) {
      return; // Ensure only one item is selected
    }
  }

  openUpdateDrawer(): void {
    if (this.setOfCheckedId.size === 1) {
      const selectedId = Array.from(this.setOfCheckedId)[0];
      this.selectedItem =
        this.busStops.find((item) => item.id === selectedId) || null;

      if (this.selectedItem) {
        this.createBusStopDrawer.selectedItem = { ...this.selectedItem }; // Pass selected item properly
        this.createBusStopDrawer.open();
      }
    }
  }
}

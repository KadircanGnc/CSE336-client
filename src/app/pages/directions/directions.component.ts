import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateDirectionsDrawerComponent } from '../../components/create-directions-drawer/create-directions-drawer.component';
import { DirectionsService } from '../../services/directions.service';
import {
  CreateDirection_WC_MLS_Request,
  GetDirections_WC_MLS_Response,
  UpdateDirectionRequest,
} from '../../types/types';

@Component({
  selector: 'app-directions',
  imports: [
    NzTableModule,
    NzButtonModule,
    HttpClientModule,
    CreateDirectionsDrawerComponent,
    CommonModule,
  ],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.css',
})
export class DirectionsComponent implements OnInit {
  directions: GetDirections_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private directionsService = inject(DirectionsService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetDirections_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();
  selectedItem: GetDirections_WC_MLS_Response | null = null;
  @ViewChild(CreateDirectionsDrawerComponent)
  createDirectionsDrawer!: CreateDirectionsDrawerComponent;

  ngOnInit(): void {
    this.loadDirections();
  }

  loadDirections(): void {
    this.directionsService
      .getDirections({
        page: this.page - 1,
        size: this.pageSize,
      })
      .subscribe((data) => {
        this.directions = data.content;
        this.totalElements = data.totalElements;
      });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach((id) => {
      this.directionsService.delete(id).subscribe(() => {
        this.loadDirections();
      });
    });
  }

  createDirection(request: CreateDirection_WC_MLS_Request): void {
    this.directionsService.create(request).subscribe(() => {
      this.loadDirections();
    });
  }

  updateDirection(id: string, request: UpdateDirectionRequest): void {
    this.directionsService.update(id, request).subscribe(() => {
      this.loadDirections();
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

  updateSelected(): void {
    if (this.setOfCheckedId.size !== 1) {
      return; // Ensure only one item is selected
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
    $event: readonly GetDirections_WC_MLS_Response[]
  ): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadDirections();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadDirections();
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

  openUpdateDrawer(): void {
    if (this.setOfCheckedId.size === 1) {
      const selectedId = Array.from(this.setOfCheckedId)[0];
      this.selectedItem =
        this.directions.find((item) => item.id === selectedId) || null;

      if (this.selectedItem) {
        this.createDirectionsDrawer.selectedItem = { ...this.selectedItem }; // Pass selected item properly
        this.createDirectionsDrawer.open();
      }
    }
  }
}

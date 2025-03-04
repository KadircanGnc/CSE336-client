import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateDirectionsDrawerComponent } from '../../components/create-directions-drawer/create-directions-drawer.component';
import { DirectionsService } from '../../services/directions.service';
import { CreateDirection_WC_MLS_Request, GetDirections_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-directions',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateDirectionsDrawerComponent, CommonModule],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.css'
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

  ngOnInit(): void {
    this.loadDirections();
  }

  loadDirections(): void {
    this.directionsService.getDirections({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.directions = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.directionsService.delete(id).subscribe(() => {
        this.loadDirections();
      });
    });
  }

  createDirection(request: CreateDirection_WC_MLS_Request): void {
    this.directionsService.create(request).subscribe(() => {
      this.loadDirections();
    })
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

  onCurrentPageDataChange($event: readonly GetDirections_WC_MLS_Response[]): void {
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
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

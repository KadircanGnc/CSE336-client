import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateDepartureDayDrawerComponent } from '../../components/create-departure-day-drawer/create-departure-day-drawer.component';
import { DepartureDaysService } from '../../services/departure-days.service';
import { CreateDepartureDays_WC_MLS_Request, GetDepartureDays_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-departure-days',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateDepartureDayDrawerComponent, CommonModule],
  templateUrl: './departure-days.component.html',
  styleUrl: './departure-days.component.css'
})
export class DepartureDaysComponent implements OnInit {
  departureDays: GetDepartureDays_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private departureDaysService = inject(DepartureDaysService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetDepartureDays_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadDepartureDays();
  }

  loadDepartureDays(): void {
    this.departureDaysService.getDepartureDays({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.departureDays = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.departureDaysService.delete(id).subscribe(() => {
        this.loadDepartureDays();
      });
    });
  }

  createDepartureDay(request: CreateDepartureDays_WC_MLS_Request): void {
    this.departureDaysService.create(request).subscribe(() => {
      this.loadDepartureDays();
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

  onCurrentPageDataChange($event: readonly GetDepartureDays_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadDepartureDays();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadDepartureDays();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

}

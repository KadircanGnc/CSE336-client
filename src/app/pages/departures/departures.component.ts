import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DeparturesService } from '../../services/departures.service';
import { CreateDepartures_WC_MLS_Request, GetDepartures_WC_MLS_Response } from '../../types/types';
import { CreateDeparturesDrawerComponent } from '../../components/create-departures-drawer/create-departures-drawer.component';

@Component({
  selector: 'app-departures',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateDeparturesDrawerComponent, CommonModule],
  templateUrl: './departures.component.html',
  styleUrl: './departures.component.css'
})
export class DeparturesComponent implements OnInit {
  departures: GetDepartures_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private departuresService = inject(DeparturesService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetDepartures_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadDepartures();
  }

  loadDepartures(): void {
    this.departuresService.getDepartures({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.departures = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.departuresService.delete(id).subscribe(() => {
        this.loadDepartures();
      });
    });
  }

  createDepartures(request: CreateDepartures_WC_MLS_Request): void {
    this.departuresService.create(request).subscribe(() => {
      this.loadDepartures();
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

  onCurrentPageDataChange($event: readonly GetDepartures_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadDepartures();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadDepartures();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

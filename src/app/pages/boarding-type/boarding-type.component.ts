

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateBoardingTypeDrawerComponent } from '../../components/create-boarding-type-drawer/create-boarding-type-drawer.component';
import { BoardingTypeService } from '../../services/boarding-type.service';
import { CreateBoardingType_WC_MLS_Request, GetBoardingTypes_WC_MLS_Response } from '../../types/types';


@Component({
  selector: 'app-boarding-type',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateBoardingTypeDrawerComponent, CommonModule],
  templateUrl: './boarding-type.component.html',
  styleUrl: './boarding-type.component.css'
})
export class BoardingTypeComponent implements OnInit {
  boardingTypes: GetBoardingTypes_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private boardingTypeService = inject(BoardingTypeService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetBoardingTypes_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadBoardingTypes();
  }

  loadBoardingTypes(): void {
    this.boardingTypeService.getBoardingTypes({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.boardingTypes = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.boardingTypeService.delete(id).subscribe(() => {
        this.loadBoardingTypes();
      });
    });
  }

  createBoardingType(request: CreateBoardingType_WC_MLS_Request): void {
    this.boardingTypeService.create(request).subscribe(() => {
      this.loadBoardingTypes();
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

  onCurrentPageDataChange($event: readonly GetBoardingTypes_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadBoardingTypes();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadBoardingTypes();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

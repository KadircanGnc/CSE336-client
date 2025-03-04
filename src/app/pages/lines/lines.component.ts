import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateLinesDrawerComponent } from '../../components/create-lines-drawer/create-lines-drawer.component';
import { LinesService } from '../../services/lines.service';
import { CreateLine_WC_MLS_Request, GetLines_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-lines',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateLinesDrawerComponent, CommonModule],
  templateUrl: './lines.component.html',
  styleUrl: './lines.component.css'
})
export class LinesComponent implements OnInit {
  lines: GetLines_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private linesService = inject(LinesService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetLines_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadLines();
  }

  loadLines(): void {
    this.linesService.getLines({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.lines = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.linesService.delete(id).subscribe(() => {
        this.loadLines();
      });
    });
  }

  createLine(request: CreateLine_WC_MLS_Request): void {
    this.linesService.create(request).subscribe(() => {
      this.loadLines();
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

  onCurrentPageDataChange($event: readonly GetLines_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadLines();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadLines();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

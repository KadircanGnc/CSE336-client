import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreatePointsDrawerComponent } from '../../components/create-points-drawer/create-points-drawer.component';
import { PointsService } from '../../services/points.service';
import { CreatePoints_WC_MLS_Request, GetPoints_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-points',
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreatePointsDrawerComponent, CommonModule],
  templateUrl: './points.component.html',
  styleUrl: './points.component.css'
})
export class PointsComponent implements OnInit {
  points: GetPoints_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;
  private pointsService = inject(PointsService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetPoints_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadPoints();
  }

  loadPoints(): void {
    this.pointsService.getPoints({
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.points = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.pointsService.delete(id).subscribe(() => {
        this.loadPoints();
      });
    });
  }

  createPoints(request: CreatePoints_WC_MLS_Request): void {
    this.pointsService.create(request).subscribe(() => {
      this.loadPoints();
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

  onCurrentPageDataChange($event: readonly GetPoints_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadPoints();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadPoints();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

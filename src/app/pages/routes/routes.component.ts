import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreateRoutesDrawerComponent } from '../../components/create-routes-drawer/create-routes-drawer.component';
import { RoutesService } from '../../services/routes.service';
import { CreateRoutes_WC_MLS_Request, GetRoutes_WC_MLS_Response } from '../../types/types';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [NzTableModule, NzButtonModule, HttpClientModule, CreateRoutesDrawerComponent, CommonModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
})
export class RoutesComponent implements OnInit {
  routes: GetRoutes_WC_MLS_Response[] = [];
  totalElements = 0;
  pageSize = 10;
  page = 1;  
  private routesService = inject(RoutesService);
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly GetRoutes_WC_MLS_Response[] = [];
  setOfCheckedId = new Set<string>();

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routesService.getRoutes({      
      page: this.page - 1,
      size: this.pageSize
    }
    ).subscribe((data) => {
      this.routes = data.content;
      this.totalElements = data.totalElements;
    });
  }

  deleteAllSelected(): void {
    this.setOfCheckedId.forEach(id => {
      this.routesService.deleteRoutes(id).subscribe(() => {
        this.loadRoutes();
      });
    });
  }

  createRoutes(request: CreateRoutes_WC_MLS_Request): void {
    this.routesService.createRoutes({
      directionId: request.directionId,
      lineId: request.lineId
    }).subscribe(() => {
      this.loadRoutes();
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

  onCurrentPageDataChange($event: readonly GetRoutes_WC_MLS_Response[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onPageIndexChange(newPage: number): void {
    this.page = newPage;
    this.loadRoutes();
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.loadRoutes();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}

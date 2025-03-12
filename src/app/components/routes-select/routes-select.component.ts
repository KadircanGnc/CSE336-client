import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RoutesService } from '../../services/routes.service';
import { Route } from '../../types/types';

@Component({
  selector: 'app-routes-select',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoutesSelectComponent),
      multi: true
    }
  ],
  templateUrl: './routes-select.component.html',
  styleUrl: './routes-select.component.css'
})
export class RoutesSelectComponent implements OnInit, ControlValueAccessor {
  private routesService = inject(RoutesService);
  routes: Route[] = [];
  value: string = '';
  @Input() placeholder: string = 'Select a Route';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routesService.getRoutes({
      page: 0,
      size: 1000
    }).subscribe((data) => {
      this.routes = data.content;
    });
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LinesService } from '../../services/lines.service';
import { Direction, Line } from '../../types/types';
import { DirectionsService } from '../../services/directions.service';

@Component({
  selector: 'app-directions-select',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DirectionsSelectComponent),
      multi: true
    }
  ],
  templateUrl: './directions-select.component.html',
  styleUrl: './directions-select.component.css'
})
export class DirectionsSelectComponent implements OnInit, ControlValueAccessor {
  private directionsService = inject(DirectionsService);
  directions: Direction[] = [];
  value: string = '';
  @Input() placeholder: string = 'Select a Direction';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadDirections();
  }

  loadDirections(): void {
    this.directionsService.getDirections({
      page: 0,
      size: 1000
    }).subscribe((data) => {
      this.directions = data.content;
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
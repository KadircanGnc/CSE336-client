import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DepartureDaysService } from '../../services/departure-days.service';
import { DepartureDay } from '../../types/types';

@Component({
  selector: 'app-departure-days-select',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepartureDaysSelectComponent),
      multi: true
    }
  ],
  templateUrl: './departure-days-select.component.html',
  styleUrl: './departure-days-select.component.css'
})
export class DepartureDaysSelectComponent implements OnInit, ControlValueAccessor {
  private departureDaysService = inject(DepartureDaysService);
  departureDays: DepartureDay[] = [];
  value: string = '';
  @Input() placeholder: string = 'Select a Departure Day';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadDepartureDays();
  }

  loadDepartureDays(): void {
    this.departureDaysService.getDepartureDays({
      page: 0,
      size: 1000
    }).subscribe((data) => {
      this.departureDays = data.content;
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
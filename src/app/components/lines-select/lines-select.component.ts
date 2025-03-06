import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LinesService } from '../../services/lines.service';
import { Line } from '../../types/types';

@Component({
  selector: 'app-lines-select',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LinesSelectComponent),
      multi: true
    }
  ],
  templateUrl: './lines-select.component.html',
  styleUrl: './lines-select.component.css'
})
export class LinesSelectComponent implements OnInit, ControlValueAccessor {
  private linesService = inject(LinesService);
  lines: Line[] = [];
  value: string = '';
  @Input() placeholder: string = 'Select a line';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadLines();
  }

  loadLines(): void {
    this.linesService.getLines({
      page: 0,
      size: 1000
    }).subscribe((data) => {
      this.lines = data.content;
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
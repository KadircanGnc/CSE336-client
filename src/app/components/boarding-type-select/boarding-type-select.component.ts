import { Component, forwardRef, inject, Input, OnInit } from '@angular/core';
import { BoardingType } from '../../types/types';
import { BoardingTypeService } from '../../services/boarding-type.service';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boarding-type-select',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoardingTypeSelectComponent),
      multi: true
    }
  ],
  templateUrl: './boarding-type-select.component.html',
  styleUrl: './boarding-type-select.component.css'
})
export class BoardingTypeSelectComponent implements OnInit, ControlValueAccessor {
  private boardingTypeService = inject(BoardingTypeService);
  boardingTypes: BoardingType[] = [];
  value: string = '';
  @Input() placeholder: string = 'Select a boarding type';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.loadBoardingTypes();
  }

  loadBoardingTypes(): void {
    this.boardingTypeService.getBoardings({
      page: 0,
      size: 1000
    }).subscribe((data) => {
      this.boardingTypes = data.content;
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
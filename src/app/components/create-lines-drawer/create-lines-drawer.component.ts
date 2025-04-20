import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateLine_WC_MLS_Request, GetLines_WC_MLS_Response, UpdateLineRequest } from '../../types/types';

@Component({
  selector: 'app-create-lines-drawer',
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  templateUrl: './create-lines-drawer.component.html',
  styleUrl: './create-lines-drawer.component.css',
})
export class CreateLinesDrawerComponent {
  visible = false;
  @Input() selectedItem: GetLines_WC_MLS_Response | null = null;
  @Output() onCreate = new EventEmitter<{
    request: CreateLine_WC_MLS_Request;
  }>();
  @Output() onUpdate = new EventEmitter<{
    id: string;
    request: UpdateLineRequest;
  }>();
  id: string | null = null;
  request: CreateLine_WC_MLS_Request = {
    lineCode: '',
    lineCodeRepresentation: '',
  };

  constructor() {}

  // Update submit method to emit the request object
  submit(): void {
    if (this.selectedItem) {
      this.update(); // Call update if we are editing
    } else {
      this.create(); // Call create if we are adding new
    }
  }

  create(): void {
    try {
      console.log('Creating request:', this.request);
      this.onCreate.emit({ request: this.request });
      this.close();
    } catch (error) {
      console.error('Error in create:', error);
    }
  }

  update(): void {
    if (this.selectedItem) {
      this.onUpdate.emit({ id: this.selectedItem.id, request: {
        lineCode: this.request.lineCode,
        lineCodeRepresentation: this.request.lineCodeRepresentation,       
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        lineCode: this.selectedItem.lineCode,
        lineCodeRepresentation: this.selectedItem.lineCodeRepresentation,
      };
    } else {
      this.resetRequest();
    }
    this.visible = true;
  }

  close(): void {
    this.resetRequest();
    this.visible = false;
  }

  resetRequest(): void {
    this.request = {
      lineCode: '',
      lineCodeRepresentation: '',
    };
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateLine_WC_MLS_Request } from '../../types/types';

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
  @Output() onSubmit = new EventEmitter<{
    request: CreateLine_WC_MLS_Request;
  }>();
  request: CreateLine_WC_MLS_Request = {
    lineCode: '',
    lineCodeRepresentation: '',
  };

  constructor() {}

  // Update submit method to emit the request object
  submit(): void {
    try {
      console.log('Submitting request:', this.request);

      this.onSubmit.emit({ request: this.request });
      this.close();
    } catch (error) {
      console.error('Error in submit:', error);
    }
  }

  open(): void {
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateDirection_WC_MLS_Request, GetDirections_WC_MLS_Response, UpdateDirectionRequest } from '../../types/types';

@Component({
  imports: [
    NzButtonModule,
    NzDrawerModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  selector: 'app-create-directions-drawer',
  templateUrl: './create-directions-drawer.component.html',
  styleUrl: './create-directions-drawer.component.css',
})
export class CreateDirectionsDrawerComponent {
  visible = false;
  @Input() selectedItem: GetDirections_WC_MLS_Response | null = null;
  @Output() onCreate = new EventEmitter<{
    request: CreateDirection_WC_MLS_Request;
  }>();
  @Output() onUpdate = new EventEmitter<{
    id: string;
    request: UpdateDirectionRequest;
  }>();
  id: string | null = null;
  request: CreateDirection_WC_MLS_Request = {
    name: '',
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
        name: this.request.name      
      } }); 
      this.close();
    }
  }

  open(): void {
    if (this.selectedItem) {
      this.request = {
        name: this.selectedItem.name
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
      name: '',
    };
  }
}

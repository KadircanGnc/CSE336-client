import { Component } from '@angular/core';



import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  imports: [NzButtonModule, NzDrawerModule, NzDatePickerModule, NzFormModule, NzInputModule, NzSelectModule],
  selector: 'app-create-boarding-drawer',
  templateUrl: './create-boarding-drawer.component.html',
  styleUrl: './create-boarding-drawer.component.css'

})
export class CreateBoardingDrawerComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  submit(): void {
    console.log('submit');
  }
}

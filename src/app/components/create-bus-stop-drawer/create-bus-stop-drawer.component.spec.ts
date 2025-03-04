import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusStopDrawerComponent } from './create-bus-stop-drawer.component';

describe('CreateBusStopDrawerComponent', () => {
  let component: CreateBusStopDrawerComponent;
  let fixture: ComponentFixture<CreateBusStopDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusStopDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusStopDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

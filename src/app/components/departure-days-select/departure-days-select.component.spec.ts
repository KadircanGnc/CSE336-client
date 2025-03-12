import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureDaysSelectComponent } from './departure-days-select.component';

describe('DepartureDaysSelectComponent', () => {
  let component: DepartureDaysSelectComponent;
  let fixture: ComponentFixture<DepartureDaysSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureDaysSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureDaysSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

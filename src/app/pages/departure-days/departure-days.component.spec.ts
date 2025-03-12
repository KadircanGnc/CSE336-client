import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureDaysComponent } from './departure-days.component';

describe('DepartureDaysComponent', () => {
  let component: DepartureDaysComponent;
  let fixture: ComponentFixture<DepartureDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

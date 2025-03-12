import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartureDayDrawerComponent } from './create-departure-day-drawer.component';

describe('CreateDepartureDayDrawerComponent', () => {
  let component: CreateDepartureDayDrawerComponent;
  let fixture: ComponentFixture<CreateDepartureDayDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartureDayDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDepartureDayDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

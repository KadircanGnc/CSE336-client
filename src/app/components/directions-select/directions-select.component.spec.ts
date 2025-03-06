import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsSelectComponent } from './directions-select.component';

describe('DirectionsSelectComponent', () => {
  let component: DirectionsSelectComponent;
  let fixture: ComponentFixture<DirectionsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionsSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

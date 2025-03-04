import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirectionsDrawerComponent } from './create-directions-drawer.component';

describe('CreateDirectionsDrawerComponent', () => {
  let component: CreateDirectionsDrawerComponent;
  let fixture: ComponentFixture<CreateDirectionsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDirectionsDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDirectionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

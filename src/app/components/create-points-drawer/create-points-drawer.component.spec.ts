import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePointsDrawerComponent } from './create-points-drawer.component';

describe('CreatePointsDrawerComponent', () => {
  let component: CreatePointsDrawerComponent;
  let fixture: ComponentFixture<CreatePointsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePointsDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePointsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

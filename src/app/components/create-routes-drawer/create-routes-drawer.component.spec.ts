import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoutesDrawerComponent } from './create-routes-drawer.component';

describe('CreateRoutesDrawerComponent', () => {
  let component: CreateRoutesDrawerComponent;
  let fixture: ComponentFixture<CreateRoutesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoutesDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoutesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

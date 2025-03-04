import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardingDrawerComponent } from './create-boarding-drawer.component';

describe('CreateBoardingDrawerComponent', () => {
  let component: CreateBoardingDrawerComponent;
  let fixture: ComponentFixture<CreateBoardingDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBoardingDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardingDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

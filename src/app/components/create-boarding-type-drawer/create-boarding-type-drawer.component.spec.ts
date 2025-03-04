import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoardingTypeDrawerComponent } from './create-boarding-type-drawer.component';

describe('CreateBoardingTypeDrawerComponent', () => {
  let component: CreateBoardingTypeDrawerComponent;
  let fixture: ComponentFixture<CreateBoardingTypeDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBoardingTypeDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBoardingTypeDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

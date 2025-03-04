import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLinesDrawerComponent } from './create-lines-drawer.component';

describe('CreateLinesDrawerComponent', () => {
  let component: CreateLinesDrawerComponent;
  let fixture: ComponentFixture<CreateLinesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLinesDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLinesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

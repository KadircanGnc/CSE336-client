import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesSelectComponent } from './routes-select.component';

describe('RoutesSelectComponent', () => {
  let component: RoutesSelectComponent;
  let fixture: ComponentFixture<RoutesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

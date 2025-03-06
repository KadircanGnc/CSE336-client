import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesSelectComponent } from './lines-select.component';

describe('LinesSelectComponent', () => {
  let component: LinesSelectComponent;
  let fixture: ComponentFixture<LinesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinesSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

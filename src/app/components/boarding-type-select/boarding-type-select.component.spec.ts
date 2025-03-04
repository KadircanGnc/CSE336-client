import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingTypeSelectComponent } from './boarding-type-select.component';

describe('BoardingTypeSelectComponent', () => {
  let component: BoardingTypeSelectComponent;
  let fixture: ComponentFixture<BoardingTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingTypeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

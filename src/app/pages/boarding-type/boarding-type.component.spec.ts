import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingTypeComponent } from './boarding-type.component';

describe('BoardingTypeComponent', () => {
  let component: BoardingTypeComponent;
  let fixture: ComponentFixture<BoardingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

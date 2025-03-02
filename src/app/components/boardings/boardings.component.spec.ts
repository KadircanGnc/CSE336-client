import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingsComponent } from './boardings.component';

describe('BoardingsComponent', () => {
  let component: BoardingsComponent;
  let fixture: ComponentFixture<BoardingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BoardingsService } from './boardings.service';

describe('BoardingsService', () => {
  let service: BoardingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

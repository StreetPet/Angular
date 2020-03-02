import { TestBed, async, inject } from '@angular/core/testing';

import { RoutersGuard } from './routers.guard';

describe('RoutersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutersGuard]
    });
  });

  it('should ...', inject([RoutersGuard], (guard: RoutersGuard) => {
    expect(guard).toBeTruthy();
  }));
});

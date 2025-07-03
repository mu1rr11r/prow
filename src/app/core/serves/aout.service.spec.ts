import { TestBed } from '@angular/core/testing';

import { AoutService } from './aout.service';

describe('AoutService', () => {
  let service: AoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

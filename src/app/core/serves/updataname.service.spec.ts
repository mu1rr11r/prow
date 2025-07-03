import { TestBed } from '@angular/core/testing';

import { UpdatanameService } from './updataname.service';

describe('UpdatanameService', () => {
  let service: UpdatanameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatanameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

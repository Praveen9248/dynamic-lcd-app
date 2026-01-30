import { TestBed } from '@angular/core/testing';

import { LanTransferService } from './lan-transfer-service';

describe('LanTransferService', () => {
  let service: LanTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PageFlowService } from './page-flow-service';

describe('PageFlowService', () => {
  let service: PageFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

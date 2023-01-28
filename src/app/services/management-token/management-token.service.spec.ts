import { TestBed } from '@angular/core/testing';

import { ManagementTokenService } from './management-token.service';

describe('ManagementTokenService', () => {
  let service: ManagementTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

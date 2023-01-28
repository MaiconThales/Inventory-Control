import { TestBed } from '@angular/core/testing';

import { SupabaseSharedService } from './supabase-shared.service';

describe('SupabaseSharedService', () => {
  let service: SupabaseSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SocialMediaLoginService } from './social-media-login.service';

describe('SocialMediaLoginService', () => {
  let service: SocialMediaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialMediaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

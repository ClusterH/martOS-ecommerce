import { TestBed } from '@angular/core/testing';

import { StoreProfileService } from './store-profile.service';

describe('StoreProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreProfileService = TestBed.get(StoreProfileService);
    expect(service).toBeTruthy();
  });
});

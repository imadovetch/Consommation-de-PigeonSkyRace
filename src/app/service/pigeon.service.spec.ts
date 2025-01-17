import { TestBed } from '@angular/core/testing';

import { PigeonService } from './pigeon.service';

describe('PigeonService', () => {
  let service: PigeonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigeonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

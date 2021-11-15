import { TestBed } from '@angular/core/testing';

import { Show360Service } from './show-360.service';

describe('Show360Service', () => {
  let service: Show360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Show360Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

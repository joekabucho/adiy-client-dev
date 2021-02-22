import { TestBed } from '@angular/core/testing';

import { AllartworksService } from './allartworks.service';

describe('AllartworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllartworksService = TestBed.get(AllartworksService);
    expect(service).toBeTruthy();
  });
});

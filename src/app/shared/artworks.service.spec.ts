import { TestBed } from '@angular/core/testing';

import { ArtWorksService } from './artworks.service';

describe('ArtworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtWorksService= TestBed.get(ArtWorksService);
    expect(service).toBeTruthy();
  });
});

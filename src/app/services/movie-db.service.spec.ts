import { TestBed } from '@angular/core/testing';

import { MovieDBService } from './movie-db.service';

describe('MovieService', () => {
  let service: MovieDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

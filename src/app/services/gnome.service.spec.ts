import { TestBed } from '@angular/core/testing';

import { GnomeService } from './gnome.service';

describe('GnomeService', () => {
  let service: GnomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GnomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Service_indexerService } from './service_indexer.service';

describe('Service: Service_indexer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Service_indexerService]
    });
  });

  it('should ...', inject([Service_indexerService], (service: Service_indexerService) => {
    expect(service).toBeTruthy();
  }));
});

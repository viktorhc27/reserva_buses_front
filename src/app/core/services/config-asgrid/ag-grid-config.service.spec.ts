import { TestBed } from '@angular/core/testing';

import { AgGridConfigService } from './ag-grid-config.service';

describe('AgGridConfigService', () => {
  let service: AgGridConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgGridConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

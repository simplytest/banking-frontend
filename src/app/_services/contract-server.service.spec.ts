import { TestBed } from '@angular/core/testing';

import { ContractServerService } from './contract-server.service';

describe('ContractServerService', () => {
  let service: ContractServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

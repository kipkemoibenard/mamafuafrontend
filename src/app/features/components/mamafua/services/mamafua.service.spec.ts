import { TestBed } from '@angular/core/testing';

import { MamafuaService } from './mamafua.service';

describe('MamafuaService', () => {
  let service: MamafuaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MamafuaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

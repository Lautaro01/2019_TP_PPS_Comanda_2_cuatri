import { TestBed } from '@angular/core/testing';

import { SolicitudesMetreService } from './solicitudes-metre.service';

describe('SolicitudesMetreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolicitudesMetreService = TestBed.get(SolicitudesMetreService);
    expect(service).toBeTruthy();
  });
});

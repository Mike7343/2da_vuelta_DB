import { TestBed } from '@angular/core/testing';

import { ConsultaServicioService } from './consulta-servicio.service';

describe('ConsultaServicioService', () => {
  let service: ConsultaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

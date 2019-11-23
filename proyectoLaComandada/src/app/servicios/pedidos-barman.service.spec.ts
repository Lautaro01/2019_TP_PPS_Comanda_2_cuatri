import { TestBed } from '@angular/core/testing';

import { PedidosBarmanService } from './pedidos-barman.service';

describe('PedidosBarmanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosBarmanService = TestBed.get(PedidosBarmanService);
    expect(service).toBeTruthy();
  });
});

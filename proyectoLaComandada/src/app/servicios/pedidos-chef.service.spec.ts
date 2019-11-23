import { TestBed } from '@angular/core/testing';

import { PedidosChefService } from './pedidos-chef.service';

describe('PedidosChefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidosChefService = TestBed.get(PedidosChefService);
    expect(service).toBeTruthy();
  });
});

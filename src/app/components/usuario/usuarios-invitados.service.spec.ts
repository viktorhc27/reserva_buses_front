import { TestBed } from '@angular/core/testing';

import { UsuariosInvitadosService } from './usuarios-invitados.service';

describe('UsuariosInvitadosService', () => {
  let service: UsuariosInvitadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosInvitadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

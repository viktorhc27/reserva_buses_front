import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInvitadoComponent } from './usuario-invitado.component';

describe('UsuarioInvitadoComponent', () => {
  let component: UsuarioInvitadoComponent;
  let fixture: ComponentFixture<UsuarioInvitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioInvitadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { SesionService } from '../../utils/sesion/sesion.service';
import { UsuarioInvitado } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosInvitadosService {
  private readonly controller: string = 'usuarios_invitados/';
  private readonly urlBase: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }

  create(data: UsuarioInvitado): any {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { usuarios_invitados: data }, this.sesionService.headers);
  }

}

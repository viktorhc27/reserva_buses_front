import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { SesionService } from '../../utils/sesion/sesion.service';
import { Clientes } from '../../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosInvitadosService {
  private readonly controller: string = 'clientes/';
  private readonly urlBase: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }

  create(data: Clientes): Observable<any> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { cliente: data }, this.sesionService.headers);
  }
  index(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.urlBase + this.controller + 'index', this.sesionService.headers);
  }
  update(data:Clientes): Observable<any> {
    return this.http.get<Clientes>(this.urlBase + this.controller + 'update', this.sesionService.headers);
  }
}

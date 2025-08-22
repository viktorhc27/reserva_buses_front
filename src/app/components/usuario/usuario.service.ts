import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly controller: string = 'usuarios/';
  private readonly urlBase: string = environment.apiURL;

  constructor(private http: HttpClient) { }
  index(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase + this.controller + 'index');
  }

  create(data: Usuario): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { usuario: data });
  }

  view(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlBase + this.controller + 'view/' + id);
  }

  update(data: Usuario): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + data.id, { usuario: data });
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id);
  }
}

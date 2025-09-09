import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../../interfaces/ruta';
import { HorarioListResponse } from '../../interfaces/horario';
import { SesionService } from '../../utils/sesion/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private readonly controller: string = 'rutas/';
  private readonly urlBase: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }

  index(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.urlBase + this.controller + 'index',this.sesionService.headers);
  }

  create(data: Ruta): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { ruta: data },this.sesionService.headers);
  }

  view(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(this.urlBase + this.controller + 'view/' + id,this.sesionService.headers);
  }

  update(data: Ruta): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + data.id, { ruta: data },this.sesionService.headers);
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id,this.sesionService.headers);
  }

  buscarRutas(origen_id: number, destino_id: number): Observable<HorarioListResponse[]> {
    return this.http.get<HorarioListResponse[]>(this.urlBase + this.controller + `buscar/${origen_id}/${destino_id}`,this.sesionService.headers);
  }
}

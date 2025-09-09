import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../../interfaces/horario';
import { SesionService } from '../../utils/sesion/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private readonly controller: string = 'horarios/';
  private readonly urlBase: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }

  index(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.urlBase + this.controller + 'index', this.sesionService.headers);
  }

  create(data: Horario): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { horario: data }, this.sesionService.headers);
  }

  view(id: number): Observable<Horario> {
    return this.http.get<Horario>(this.urlBase + this.controller + 'view/' + id, this.sesionService.headers);
  }

  update(data: Horario): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + data.id, { horario: data }, this.sesionService.headers);
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id, this.sesionService.headers);
  }
}

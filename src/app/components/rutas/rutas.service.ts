import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../../interfaces/ruta';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  private readonly controller: string = 'rutas/';
  private readonly urlBase: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  index(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.urlBase + this.controller + 'index');
  }

  create(data: Ruta): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { ruta: data });
  }

  view(id: number): Observable<Ruta> {
    return this.http.get<Ruta>(this.urlBase + this.controller + 'view/' + id);
  }

  update(data: Ruta): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + data.id, { ruta: data });
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id);
  }
}

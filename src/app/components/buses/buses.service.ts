import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment';
import { Observable } from 'rxjs';
import { Bus } from '../../interfaces/bus';

@Injectable({
  providedIn: 'root'
})
export class BusesService {
  private readonly controller: string = 'buses/';
  private readonly urlBase: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  index(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.urlBase + this.controller + 'index');
  }

  create(bus: Bus): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { bus: bus });
  }

  view(id: number): Observable<Bus> {
    return this.http.get<Bus>(this.urlBase + this.controller + 'view/' + id);
  }

  update(bus: Bus): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + bus.id, { bus: bus });
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id);
  }
}

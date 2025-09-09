import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsientosSeleccionados, Reserva } from '../../interfaces/reserva';
import { SesionService } from '../../utils/sesion/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private readonly controller: string = 'reservas/';
  private readonly urlBase: string = environment.apiURL;


  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }
  index(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.urlBase + this.controller + 'index', this.sesionService.headers);
  }

  create(data: any): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'create', { reserva: data }, this.sesionService.headers);
  }
  reservar(data: any): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.urlBase + this.controller + 'reservar', { reserva: data }, this.sesionService.headers);
  }
  view(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(this.urlBase + this.controller + 'view/' + id, this.sesionService.headers);
  }

  update(data: Reserva): Observable<{ response: string }> {
    return this.http.put<{ response: string }>(this.urlBase + this.controller + 'update/' + data.id, { horario: data }, this.sesionService.headers);
  }

  delete(id: number): Observable<{ response: string }> {
    return this.http.delete<{ response: string }>(this.urlBase + this.controller + 'delete/' + id, this.sesionService.headers);
  }

  setAsientos(asientos: AsientosSeleccionados[]) {
    localStorage.setItem('asientos_seleccionados', JSON.stringify(asientos));
  }
  //
  getAsientos() {
    return JSON.parse(localStorage.getItem('asientos_seleccionados') || '[]');
  }

  // Limpiar selección
  limpiarAsientos(): void {
    localStorage.removeItem('asientos_seleccionados');
  }
  verificarReserva(reserva: any): Observable<any> {
    return this.http.post(this.urlBase + this.controller + 'verificarReserva', { reserva })
  }
  verificarReservaLista(reserva: any): Observable<any> {
    return this.http.post(this.urlBase + this.controller + 'verificarListaReserva', { reserva })
  }
  ticketReserva(ticket_id: number): Observable<Blob> {
    return this.http.get(this.urlBase + this.controller + 'ticket_reserva/' + ticket_id, { responseType: 'blob' })

  }
}

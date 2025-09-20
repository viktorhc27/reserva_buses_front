import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionService } from '../../utils/sesion/sesion.service';
import { Asientos } from '../../interfaces/asientos';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {
  private readonly controller: string = 'asientos/';
  private readonly urlBase: string = environment.apiURL;
  constructor(
    private http: HttpClient,
    private sesionService: SesionService
  ) { }

  list_asientos(id: any): Observable<any> {
    return this.http.get<any>(this.urlBase + this.controller + 'asientos_disponibles/' + id, this.sesionService.headers);
  }

  index(): Observable<Asientos[]> {
    return this.http.get<Asientos[]>(this.urlBase + this.controller + 'index', this.sesionService.headers);
  }


  misAsientos(id: number): Observable<Asientos[]> {
    return this.http.get<Asientos[]>(this.urlBase + this.controller + 'misAsientos/' + id, this.sesionService.headers);
  }


}

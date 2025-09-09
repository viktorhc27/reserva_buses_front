import { Injectable } from '@angular/core';
import { environment } from '../../core/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SesionService } from '../../utils/sesion/sesion.service';

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

}

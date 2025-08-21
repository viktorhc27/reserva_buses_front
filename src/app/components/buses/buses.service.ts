import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BusesService {
  controller: string = 'buses/'
  urlBase = environment.apiURL;
  constructor(
    private http: HttpClient,
    /*    private config: ConfigService,
       private sesion: SesionService */
  ) { }

  index(): Observable<any> {
    return this.http.get(environment.apiURL + this.controller + 'index');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../core/environment';
import { Observable } from 'rxjs';
import { Bus } from '../../interfaces/bus';
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
  create(form: any): Observable<any> {
    return this.http.post(environment.apiURL + this.controller + 'create', { bus: form });
  }
  view(data: any): Observable<any> {
    return this.http.get(environment.apiURL + this.controller + 'view/' + data);
  }
  update(form: any): Observable<any> {
    return this.http.put(environment.apiURL + this.controller + 'update/' + form.id, { bus: form });
  }
  eliminar(data: any): Observable<any> {
    return this.http.delete(environment.apiURL + this.controller + 'delete/' + data);
  }
}

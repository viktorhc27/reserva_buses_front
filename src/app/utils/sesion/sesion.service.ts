import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../core/environment';
import { IsLoggedResponse, LoginResponse } from '../../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

 private readonly controller: string = 'auth/';
  private readonly urlBase: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /** Obtiene el token guardado en localStorage */
  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  /** Headers sin token */
  private get httpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  /** Headers con token */
  get headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    }
  }

  /** Inicia sesión y guarda token + usuario en localStorage */
  login(credenciales: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.urlBase}${this.controller}login`,
      credenciales,
      this.httpOptions
    ).pipe(
      map(res => {
        if (res.response === 'success' && res.token && res.usuario) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }
        return res;
      }),
      catchError(() => of({ response: 'error' as const, message: 'Error en la conexión con el servidor' }))
    );
  }

  /** Verifica si el usuario sigue logeado */
  isLogged(): Observable<boolean> {
    return this.http.get<IsLoggedResponse>(
      `${this.urlBase}${this.controller}isLogged`,
      this.headers
    ).pipe(
      map(res => res.logged),
      catchError(() => of(false))
    );
  }

  /** Cierra sesión eliminando datos */
  clearSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']); // opcional: redirigir al login
  }
}

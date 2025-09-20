import { inject } from '@angular/core';
import { CanActivateFn, Router,UrlTree } from '@angular/router';
import { SesionService } from '../../utils/sesion/sesion.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(SesionService);
  const router = inject(Router);


  if (!service.token) {
    return router.createUrlTree(['/login']);
  }

  return service.isLogged().pipe(
    map((logged: boolean) => (logged ? true : router.createUrlTree(['/login']))),
    catchError((error) => {
      console.log('Error al validar sesion', error);
      return of(router.createUrlTree(['/login']));
    })
  );


};

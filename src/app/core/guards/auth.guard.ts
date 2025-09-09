import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '../../utils/sesion/sesion.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(SesionService);
  const router = inject(Router);


  if(!service.token){
    router.navigate(['/login']);
    return false;
  }
  console.log("guard");

  return true;
};

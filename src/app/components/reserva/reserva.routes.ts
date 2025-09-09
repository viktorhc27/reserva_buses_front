import { Routes } from '@angular/router';
import { ReservaIndexComponent } from './reserva-index/reserva-index.component';
import { ReservaCreateComponent } from './reserva-create/reserva-create.component';
import { AsignacionUsuariosComponent } from './asignacion-usuarios/asignacion-usuarios.component';

export const reservaRoutes: Routes = [
  { path: 'index', component: ReservaIndexComponent },
  { path: 'create', component: ReservaCreateComponent },
  { path: 'asignacion-usuarios', component: AsignacionUsuariosComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

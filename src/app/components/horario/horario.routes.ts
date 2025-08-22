import { Routes } from '@angular/router';
import { HorarioIndexComponent } from './horario-index/horario-index.component';
import { HorarioCreateComponent } from './horario-create/horario-create.component';

export const horarioRoutes: Routes = [
  { path: 'index', component: HorarioIndexComponent },
  { path: 'create', component: HorarioCreateComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

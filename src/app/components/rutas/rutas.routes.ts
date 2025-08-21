import { Routes } from '@angular/router';
import { RutasIndexComponent } from './rutas-index/rutas-index.component';
import { RutasCreateComponent } from './rutas-create/rutas-create.component';

export const rutasRoutes: Routes = [
  { path: 'index', component: RutasIndexComponent },
  { path: 'create', component: RutasCreateComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

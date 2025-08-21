import { Routes } from '@angular/router';
import { BusesCreateComponent } from './buses-create/buses-create.component';
import { BusesIndexComponent } from './buses-index/buses-index.component';

export const busesRoutes: Routes = [
  { path: 'index', component: BusesIndexComponent },
  { path: 'create', component: BusesCreateComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

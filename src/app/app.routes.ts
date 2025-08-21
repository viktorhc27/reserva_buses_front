import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'buses', loadChildren: () => import('./components/buses/buses.routes').then(m => m.busesRoutes) },
  { path: 'rutas', loadChildren: () => import('./components/rutas/rutas.routes').then(m => m.rutasRoutes) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

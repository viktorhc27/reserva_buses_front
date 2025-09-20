import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, children: [
      { path: 'buses', loadChildren: () => import('./components/buses/buses.routes').then(m => m.busesRoutes), canActivate: [authGuard], },
      { path: 'asientos', loadChildren: () => import('./components/asientos/asientos.routes').then(m => m.asientosRoutes), canActivate: [authGuard], },
      { path: 'rutas', loadChildren: () => import('./components/rutas/rutas.routes').then(m => m.rutasRoutes), canActivate: [authGuard], },
      { path: 'horario', loadChildren: () => import('./components/horario/horario.routes').then(m => m.horarioRoutes), canActivate: [authGuard], },
      { path: 'usuario', loadChildren: () => import('./components/usuario/usuarios.routes').then(m => m.usuariosRoutes), canActivate: [authGuard], },
      { path: 'reservas', loadChildren: () => import('./components/reserva/reserva.routes').then(m => m.reservaRoutes), canActivate: [authGuard], },
      { path: 'payment', loadChildren: () => import('./components/payment/payment.routes').then(m => m.paymentRoutes), },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';


export const usuariosRoutes: Routes = [
  { path: 'index', component: UsuarioIndexComponent },
  { path: 'create', component: UsuarioCreateComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
];

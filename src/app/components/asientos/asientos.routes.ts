import { Routes } from '@angular/router'
import { AsientosIndexComponent } from './asientos-index/asientos-index.component'

export const asientosRoutes: Routes = [
  { path: 'index', component: AsientosIndexComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }
]

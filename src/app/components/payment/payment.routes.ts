import { Routes } from '@angular/router'
import { PaymentCreateComponent } from './payment-create/payment-create.component'

export const paymentRoutes: Routes = [
  { path: 'create', component: PaymentCreateComponent },
  { path: '', redirectTo: 'create', pathMatch: 'full' }
]

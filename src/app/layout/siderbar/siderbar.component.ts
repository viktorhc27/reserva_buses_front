import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SesionService } from '../../utils/sesion/sesion.service';

@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.scss'
})
export class SiderbarComponent {
   loading = false;
  readonly sesionService = inject(SesionService)


  cerrarSesion() {
    this.sesionService.clearSesion()
  }

}

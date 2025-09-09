import { Component, inject } from '@angular/core';
import { Ruta } from '../../../interfaces/ruta';
import { RutasService } from '../../rutas/rutas.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Horario } from '../../../interfaces/horario';
import { NgxLoadingModule } from 'ngx-loading';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxLoadingModule],
  templateUrl: './reserva-index.component.html',
  styleUrl: './reserva-index.component.scss'
})
export class ReservaIndexComponent {
  loading = false;
  rutas: Ruta[] = [];
  horarios: Horario[] = [];
  form: FormGroup = new FormGroup({});
  readonly servicesrutas = inject(RutasService);
  readonly alertService = inject(AlertService);
  readonly formBuilder = inject(FormBuilder);
  readonly router = inject(Router);
  ngOnInit(): void {
    this.initForm();
    this.loadRutas();
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      origen_id: [null, Validators.required],
      destino_id: [null, Validators.required]
    });
  }
  loadRutas() {
    this.loading = true;
    this.servicesrutas.index().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.rutas = res;

      }, error: (err: any) => {
        this.loading = false;
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
  buscarRuta() {
    this.loading = true;
    const { origen_id, destino_id } = this.form.value;
    this.servicesrutas.buscarRutas(origen_id, destino_id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.horarios = res;
        console.log(res);
      }, error: (err: any) => {
        this.loading = false;
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }

  reservar(id: any) {
    this.router.navigate(['reservas/create'], { queryParams: { horario_id: id} });
  }
}

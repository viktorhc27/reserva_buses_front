import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from '../../horario/horario.service';
import { Horario } from '../../../interfaces/horario';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule, DatePipe, UpperCasePipe, NgIf } from '@angular/common';
import { Asientos } from '../../../interfaces/asientos';
import { AsientosListComponent } from '../../asientos/asientos-list/asientos-list.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { PreReserva } from '../../../interfaces/reserva';
import { catchError, finalize, forkJoin, of, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-reserva-create',
  standalone: true,
  imports: [
    CommonModule,
    NgxLoadingModule,
    DatePipe,
    AsientosListComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.scss']
})
export class ReservaCreateComponent {
  loading = false;
  horario!: Horario;
  asientos: Asientos[] = [];
  reservas!: PreReserva[]//para pintar los asinetos seleccionados
  qty = 1;
  form: FormGroup = new FormGroup({});
  pre_reserva: FormGroup = new FormGroup({});
  formUsuario: FormGroup = new FormGroup({});
  vista: 'reserva' | 'informacion' | 'pago' = 'reserva';

  readonly router = inject(Router);
  readonly servicesHorario = inject(HorarioService);
  readonly alertService = inject(AlertService);
  readonly route = inject(ActivatedRoute);
  readonly formBuilder = inject(FormBuilder);
  readonly servicesReserva = inject(ReservaService);

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      const horarioId = params['horario_id'];
      if (horarioId) {
        this.loadHorario(horarioId);
      }
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      reserva: this.formBuilder.array([])
    });

    this.formUsuario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      rol: ['cliente', Validators.required]
    });
  }

  get lineasForm(): FormArray {
    return this.form.get('reserva') as FormArray;
  }
  /**
   * Agrega una nueva reserva de asiento al formulario dinámico (`lineasForm`).
   *
   * @param horario_id - Identificador del horario al que pertenece la reserva.
   * @param asiento_id - Identificador del asiento seleccionado.
   * @param asiento - Objeto con la información del asiento seleccionado.
   *
   * - Verifica si ya existe una reserva para el mismo `asiento_id` y evita duplicados.
   * - Comprueba que la propiedad `horario` esté definida antes de continuar.
   * - Crea un `FormGroup` con los datos necesarios (horario, asiento, bus, usuario).
   * - Inserta el grupo en el arreglo de controles (`lineasForm`).
   */
  private agregarReserva(horario_id: number, asiento_id: number, asiento: Asientos): void {
    // Verifica si ya existe una reserva para el asiento_id
    const existe = this.lineasForm.controls.some(
      ctrl => ctrl.get('asientos_id')?.value === asiento_id
    );
    if (existe) return;

    if (!this.horario) {
      console.error('Horario no definido');
      return;
    }

    this.pre_reserva = this.formBuilder.group({
      horario_id: [horario_id, Validators.required],
      asientos_id: [asiento_id, Validators.required],
      bus_id: [this.horario.bus_id, Validators.required],
      asiento: [asiento],
      cliente_id: [null],
    });
    this.lineasForm.push(this.pre_reserva);
  }
  private loadHorario(id: number) {
    this.loading = true
    this.servicesHorario.view(id).subscribe({
      next: (res: Horario) => {
        this.loading = false;
        this.horario = res;
        this.asientos = res.bus?.asientos || [];
        const lista = this.servicesReserva.getAsientos()
        if (lista) {
          this.verificarReservas(lista)
        }

      }, error: (err: any) => {
        this.loading = false;
        console.log(err);
        this.alertService.alertError(err);
        console.error('Error general', err);

      }
    });
  }
  private verificarReservas(listaReservas: any) {
    this.loading = true
    this.servicesReserva.verificarReservaLista(listaReservas).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.qty = res.qty
        if (!res.libre) {
          this.alertService.alertInfo(res.response)
        }
      }, error: (err: any) => {
        this.loading = false;
        console.log(err);
        this.alertService.alertError(err);
      }
    });

  }

  recibirAsientoSeleccionado(asientos: Asientos[]): void {
    this.lineasForm.clear();
    if (!this.horario || typeof this.horario.id === 'undefined') {
      console.error('Horario no definido');
      return;
    }
    asientos.forEach(a => {
      this.agregarReserva(this.horario.id, a.id, a);
    });
  }

  guardar(): void {
    console.log(this.lineasForm.value);

    if (this.form.invalid || this.lineasForm.length === 0) {
      this.alertService.alertWarning('Por favor seleccione al menos un asiento.');
      return;
    }

    this.loading = true;
    this.servicesReserva.reservar(this.form.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.alertService.alertSuccess(res.response);
        this.router.navigate(['reservas']);
      },
      error: (err: any) => {
        this.loading = false;
        console.error(err);
      }
    });

  }

  siguiente(): void {
    const seleccionados = this.lineasForm.value;
    console.log(seleccionados);

    const cantidadSeleccionada = seleccionados?.length ?? 0;

    if (cantidadSeleccionada === 0) {
      this.alertService.alertWarning('Debe seleccionar al menos un asiento.');
      return;
    }

    if (cantidadSeleccionada < this.qty) {
      this.alertService.alertWarning(`Debe seleccionar ${this.qty} asientos. Actualmente seleccionó ${cantidadSeleccionada}.`);
      return;
    }

    this.servicesReserva.setAsientos(seleccionados);
    this.router.navigate(['/reservas/asignacion-usuarios']);
  }

}
/*   private loadHorario(id: number): void {
    this.loading = true;
    this.servicesHorario.view(id).pipe(
      switchMap((res: Horario) => {
        this.horario = res;
        this.asientos = res.bus?.asientos || [];
        return this.servicesReserva.getAsientos()

      }),
      switchMap((reservas: any) => {
        this.qty = reservas.length || 1;
        if (reservas) {
          this.cargarReservasAsignadas(reservas);
          const verificaciones$ = this.servicesReserva.verificarReserva(reservas).pipe(
            catchError(err => {
              console.error('Error en verificarReserva', err);
              return of(false); // seguimos el flujo aunque falle
            })
          );
          console.log(verificaciones$);

          return forkJoin(verificaciones$)
        } else {
          return of(false);
        }
      }),
      catchError(err => {
        console.log(err);
        this.alertService.alertError(err);
        console.error('Error general', err);
        return of(false);
      }),
      finalize(() => {
        this.loading = false; // <-- Aseguramos desactivar loading siempre
      })
    ).subscribe(res => {
      console.log(res);
      if (!res) {
        this.alertService.alertInfo('algunos de sus asientos ya no se encuetran disponibles')

      }
    });
  }
 */

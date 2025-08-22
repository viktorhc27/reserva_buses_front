import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HorarioService } from '../horario.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Horario } from '../../../interfaces/horario';
import { Bus } from '../../../interfaces/bus';
import { Ruta } from '../../../interfaces/ruta';
import { Usuario } from '../../../interfaces/usuario';
import { BusesService } from '../../buses/buses.service';
import { RutasService } from '../../rutas/rutas.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-horario-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './horario-view.component.html',
  styleUrl: './horario-view.component.scss'
})
export class HorarioViewComponent {
  @Input() element!: Horario;
  loading = false;
  form: FormGroup = new FormGroup({});
  buses: Bus[] = []
  rutas: Ruta[] = []
  usuarios: Usuario[] = []

  readonly services = inject(HorarioService);
  readonly servicesBuses = inject(BusesService);
  readonly servicesRutas = inject(RutasService);
  readonly servicesUsuarios = inject(UsuarioService);
  readonly alertService = inject(AlertService);
  readonly activeModal = inject(NgbActiveModal);
  readonly formBuilder = inject(FormBuilder);
  readonly estadoOptions = [
    { id: 'ACTIVO', estado: 'activo' },
    { id: 'CANCELADO', estado: 'cancelado' }
  ];
  ngOnInit(): void {
    this.loadBuses();
    this.loadRutas();
    this.loadUsuarios();
    this.initForm();
    this.populateForm()
    this.form.disable();
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [],
      fechaSalida: [null, Validators.required],
      horaSalida: [null, Validators.required],
      bus_id: [null, Validators.required],
      ruta_id: [null, Validators.required],
      usuario_id: [null, Validators.required],
      estado: ['ACTIVO', Validators.required]
    });
  }

  private populateForm(): void {
    if (this.element) {
      this.form.patchValue(this.element);
    }
  }
  loadBuses() {
    this.loading = true;
    this.servicesBuses.index().subscribe({
      next: (res: Bus[]) => {
        this.loading = false;
        this.buses = res
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar:', err);
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
  loadUsuarios() {
    this.loading = true;
    this.servicesUsuarios.index().subscribe({
      next: (res: Usuario[]) => {
        this.loading = false;
        this.usuarios = res
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar:', err);
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
  loadRutas() {
    this.loading = true;
    this.servicesRutas.index().subscribe({
      next: (res: Ruta[]) => {
        this.loading = false;
        this.rutas = res
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al cargar:', err);
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
}

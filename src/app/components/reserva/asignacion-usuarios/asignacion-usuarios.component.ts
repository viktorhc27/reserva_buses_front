import { Component, inject, signal } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { NgxLoadingModule } from 'ngx-loading';
import { UsuarioService } from '../../usuario/usuario.service';
import { NgxMaskDirective } from 'ngx-mask';
import { rutValidator } from '../../../utils/validators/form-validator';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioListComponent } from '../usuario-list/usuario-list.component';
import { AsientosSeleccionados } from '../../../interfaces/reserva';

@Component({
  selector: 'app-asignacion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxLoadingModule, NgxMaskDirective],
  templateUrl: './asignacion-usuarios.component.html',
  styleUrl: './asignacion-usuarios.component.scss'
})
export class AsignacionUsuariosComponent {
  loading = false;
  form: FormGroup = new FormGroup({})
  readonly serviceReserva = inject(ReservaService);
  readonly servicesUsuarios = inject(UsuarioService);
  readonly formBuilder = inject(FormBuilder);
  readonly alertService = inject(AlertService);
  readonly modalServices = inject(NgbModal);

  usuarios: any;
  lista_asientos = signal<AsientosSeleccionados[]>(this.serviceReserva.getAsientos());

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      rut: [null, [Validators.required, rutValidator()]]
    })
    this.loadUsuarios()
    console.log(this.lista_asientos);
  }

  private loadUsuarios(): void {
    this.loading = true;
    this.servicesUsuarios.index().subscribe({
      next: (data) => {
        this.loading = false;
        this.usuarios = data;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }
  buscarUsuarios(asiento_id: number) {
    if (this.form.invalid) {
      return this.alertService.alertWarning('Error en el rut')
    }
    const modelRef = this.modalServices.open(UsuarioListComponent, { size: 'md' });
    modelRef.componentInstance.usuario = this.usuarios.find((e: Usuario) => e.rut === this.form.get('rut')?.value);
    modelRef.componentInstance.asiento_id = asiento_id
    modelRef.result.then(
      () => {
        modelRef.result.then((id: number) => {
          this.lista_asientos.update(asientos =>
            asientos.map(a =>
              a.asientos_id === asiento_id ? { ...a, usuario_id: id } : a
            )
          );
          this.serviceReserva.setAsientos(this.lista_asientos())
        });
      },
      (reason) => {
        console.log('Modal cerrado sin guardar:', reason);
      }
    );
  }

  getUsuario(id: number): Usuario {
    return this.usuarios.find((e: Usuario) => e.id = id);
  }

  guardarReserva() {
    this.loading = true
    console.log(this.lista_asientos());
    this.serviceReserva.reservar(this.lista_asientos()).subscribe({
      next: (res: any) => {
        this.loading = false
        console.log(res);

      }, error: (err: any) => {
        this.loading = false

        this.alertService.alertWarning(err.response)
      }
    });

  }
}

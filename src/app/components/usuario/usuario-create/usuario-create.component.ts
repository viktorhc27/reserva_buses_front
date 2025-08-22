import { Component, inject } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss'
})
export class UsuarioCreateComponent {
  loading = false;
  form: FormGroup = new FormGroup({});

  readonly usuariosService = inject(UsuarioService);
  readonly alertService = inject(AlertService);
  readonly activeModal = inject(NgbActiveModal);
  readonly formBuilder = inject(FormBuilder);

  readonly rolOptions = [
    { id: 'admin', rol: 'Administrador' },
    { id: 'chofer', rol: 'Chofer' },
    { id: 'cliente', rol: 'Cliente' }
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }

  create(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.alertWarning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.loading = true;
    const usuario: Usuario = this.form.value;

    this.usuariosService.create(usuario).subscribe({
      next: (res) => {
        this.loading = false;
        this.alertService.alertSuccess(res.response);
        this.activeModal.close();
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
}

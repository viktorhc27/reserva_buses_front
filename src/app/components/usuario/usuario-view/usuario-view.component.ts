import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../usuario.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './usuario-view.component.html',
  styleUrl: './usuario-view.component.scss'
})
export class UsuarioViewComponent {
  @Input() element!: Usuario
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
      id:[],
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
      rol: [null, Validators.required]
    });
    this.populateForm()
  }
  private populateForm(): void {
    if (this.element) {
      this.form.patchValue(this.element);
    }
  }
  update(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.alertWarning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.loading = true;
    const usuario: Usuario = this.form.value;

    this.usuariosService.update(usuario).subscribe({
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

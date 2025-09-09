import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {
  @Input() usuario!: any;
  @Output() usuario_id = new EventEmitter<number>();
  editMode = false;
  loading = false;
  formUsuario: FormGroup = new FormGroup({});
  readonly activeModal = inject(NgbActiveModal);
  readonly servicesUsuarios = inject(UsuarioService);
  readonly fb = inject(FormBuilder);
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formUsuario = this.fb.group({
      id: [this.usuario.id],
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      telefono: [this.usuario.telefono]
    });
    console.log(this.usuario);
  }
  guardarCambios(): void {
    this.loading = true;
    this.servicesUsuarios.update(this.formUsuario.value).subscribe({
      next: (data) => {
        this.loading = false;
        this.editMode = false;
        this.usuario = data
        this.initForm()

      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }
  emitirUsuario() {
    this.activeModal.close(this.usuario.id);
  }
}

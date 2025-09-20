import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosInvitadosService } from '../../usuario/usuarios-invitados.service';
import { rutValidator } from '../../../utils/validators/form-validator';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* import IMask from 'imask'; */
@Component({
  selector: 'app-usuario-invitado',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario-invitado.component.html',
  styleUrl: './usuario-invitado.component.scss'
})
export class UsuarioInvitadoComponent {
  loading = true
  readonly servicioInvitados = inject(UsuariosInvitadosService);
  readonly formbuilder = inject(FormBuilder);
  readonly alert = inject(AlertService)
  /*   readonly modalServices = inject(NgbModal); */
  readonly activeModal = inject(NgbActiveModal);

  form: FormGroup = new FormGroup({})
  @ViewChild('rutInput') rutInput!: ElementRef;
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      nombre: [null, Validators.required],
      apellidos: [null, Validators.required],
      rut: [null, [Validators.required, rutValidator]],
      email: [null, Validators.required],
      telefono: [null, Validators.required]
    })
  }

/*   ngAfterViewInit(): void {
    IMask(this.rutInput.nativeElement, {
      mask: '00.000.000-0',
      lazy: false,
      prepare: function (str) {
        return str.toUpperCase(); // Convierte K a mayúscula automáticamente
      },
      blocks: {
        '0': { mask: IMask.MaskedRange, from: 0, to: 9 },
      },
    });
  } */

  /**
 * Guarda un invitado usando el servicio `servicioInvitados`.
 *
 * - Activa el indicador de carga (`loading`).
 * - Valida el formulario: si es inválido, muestra una alerta de advertencia y no continúa.
 * - Si el formulario es válido, envía los datos al backend mediante `servicioInvitados.create`.
 * - Muestra mensajes según la respuesta:
 *   - Éxito → Alerta de confirmación y cierre del modal con el modelo retornado.
 *   - Error → Desactiva el loading y muestra el mensaje de error si existe.
 */
  guardarInvitado() {
    console.log(this.form.value);

    /*   this.loading = true
      if (this.form.invalid) {
        this.alert.alertWarning('Error en el fomulario')
      }
      this.servicioInvitados.create(this.form.value).subscribe({
        next: (res: any) => {
          this.loading = false
          this.alert.alertSuccess(res.response)
          this.activeModal.close(res.model)
        },
        error: (err: any) => {
          this.loading = false
          console.log(err);
          if (err.error.response) this.alert.alertError(err.error.response)

        }
      }); */
  }
}

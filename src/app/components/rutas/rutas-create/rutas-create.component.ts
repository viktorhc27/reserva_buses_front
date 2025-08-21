import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AlertService } from '../../../core/services/alert/alert.service';
import { RutasService } from '../rutas.service';
import { Ruta } from '../../../interfaces/ruta';

@Component({
  selector: 'app-rutas-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './rutas-create.component.html',
  styleUrl: './rutas-create.component.scss'
})
export class RutasCreateComponent {
  loading = false;
  form: FormGroup = new FormGroup({});

  readonly service = inject(RutasService);
  readonly alertService = inject(AlertService);
  readonly activeModal = inject(NgbActiveModal);
  readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      origen: [null, Validators.required],
      destino: [null, Validators.required],
      duracionEstimada: [null, Validators.required],
    });
  }

  create(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.alertWarning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.loading = true;
    const busData: Ruta = this.form.value;

    this.service.create(busData).subscribe({
      next: (res) => {
        this.loading = false;
        this.alertService.alertSuccess(res.response);
        this.activeModal.close();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear bus:', err);
        this.alertService.alertError(err.response || 'Ocurrió un error inesperado.');
      }
    });
  }
}

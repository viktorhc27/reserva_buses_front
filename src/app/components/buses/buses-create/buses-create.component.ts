import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusesService } from '../buses.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { Bus } from '../../../interfaces/bus';

@Component({
  selector: 'app-buses-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './buses-create.component.html',
  styleUrl: './buses-create.component.scss'
})
export class BusesCreateComponent implements OnInit {
  loading = false;
  form: FormGroup = new FormGroup({});

  readonly busesService = inject(BusesService);
  readonly alertService = inject(AlertService);
  readonly activeModal = inject(NgbActiveModal);
  readonly formBuilder = inject(FormBuilder);

  readonly estadoOptions = [
    { id: 'ACTIVO', estado: 'activo' },
    { id: 'INACTIVO', estado: 'inactivo' }
  ];

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      patente: [null, Validators.required],
      modelo: [null, Validators.required],
      capacidad: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  create(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.alertService.alertWarning('Por favor completa todos los campos requeridos.');
      return;
    }

    this.loading = true;
    const busData: Bus = this.form.value;

    this.busesService.create(busData).subscribe({
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

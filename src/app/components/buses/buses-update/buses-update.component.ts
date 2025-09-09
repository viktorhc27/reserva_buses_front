import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusesService } from '../buses.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { Bus } from '../../../interfaces/bus';

@Component({
  selector: 'app-buses-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './buses-update.component.html',
  styleUrl: './buses-update.component.scss'
})
export class BusesUpdateComponent implements OnInit {
  @Input() element!: Bus;

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
    this.populateForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [],
      patente: [null, Validators.required],
      modelo: [null, Validators.required],
      capacidad: [null, Validators.required],
      estado: [null, Validators.required]
    });
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
    this.busesService.update(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.activeModal.close();
        this.alertService.alertSuccess(res.response);
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err.response || err);
      }
    });
  }
}

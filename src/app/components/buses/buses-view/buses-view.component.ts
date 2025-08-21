import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { BusesService } from '../buses.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { Bus } from '../../../interfaces/bus';

@Component({
  selector: 'app-buses-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './buses-view.component.html',
  styleUrl: './buses-view.component.scss'
})
export class BusesViewComponent implements OnInit {
  @Input() element!: Bus;
  form: FormGroup = new FormGroup({});
  loading = false;

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
    this.form.disable(); // Solo lectura
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
}

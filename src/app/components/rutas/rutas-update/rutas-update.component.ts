import { Component, inject, Input } from '@angular/core';
import { RutasService } from '../rutas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta } from '../../../interfaces/ruta';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-rutas-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './rutas-update.component.html',
  styleUrl: './rutas-update.component.scss'
})
export class RutasUpdateComponent {
  @Input() element!: Ruta;
  form: FormGroup = new FormGroup({});
  loading = false;
  readonly service = inject(RutasService);
  readonly alertService = inject(AlertService);
  readonly activeModal = inject(NgbActiveModal);
  readonly formBuilder = inject(FormBuilder);


  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [],
      origen: [null, Validators.required],
      destino: [null, Validators.required],
      duracionEstimada: [null, Validators.required],
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
    this.service.update(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.alertService.alertSuccess(res.response);
        this.activeModal.close();
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err.response || err);
      }
    });
  }
}

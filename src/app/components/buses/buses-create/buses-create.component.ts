import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusesService } from '../buses.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-buses-create',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './buses-create.component.html',
  styleUrl: './buses-create.component.scss'
})
export class BusesCreateComponent {
  loading = false;
  private services = inject(BusesService);
  private alert = inject(AlertService);
  public activeModal = inject(NgbActiveModal);
  items = [
    { id: 'ACTIVO', estado: 'activo' },
    { id: 'INACTIVO', estado: 'inactivo' }
  ];
  form: FormGroup = new FormGroup({});
  constructor(
    public formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      patente: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      capacidad: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  create() {
    this.loading = true;
    this.services.create(this.form.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.alert.alertSuccess(res.response)
        this.activeModal.close()
      }, error: (err: any) => {
        this.loading = false;
        console.log(err);
        if (err.response) this.alert.alertError(err.response)
      }
    });
  }


}

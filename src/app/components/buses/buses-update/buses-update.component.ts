import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusesService } from '../buses.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-buses-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './buses-update.component.html',
  styleUrl: './buses-update.component.scss'
})
export class BusesUpdateComponent {
  loading = false;
  @Input() element: any
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


  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [],
      patente: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      capacidad: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });

    this.form.patchValue(this.element);

  }
  update() {
    this.loading = true;
    this.services.update(this.form.value).subscribe({
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

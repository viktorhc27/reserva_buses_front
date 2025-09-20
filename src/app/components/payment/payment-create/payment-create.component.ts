import { Component, inject, signal } from '@angular/core';
import {  PreReserva } from '../../../interfaces/reserva';
import { NgxMaskDirective } from 'ngx-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../reserva/reserva.service';

@Component({
  selector: 'app-payment-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxLoadingModule, NgxMaskDirective],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.scss'
})
export class PaymentCreateComponent {
  loading = false;
  form: FormGroup = new FormGroup({})
  readonly serviceReserva = inject(ReservaService);
  lista_asientos = signal<PreReserva[]>(this.serviceReserva.getAsientos());
}

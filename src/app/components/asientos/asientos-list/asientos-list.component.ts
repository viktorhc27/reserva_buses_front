import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Asientos } from '../../../interfaces/asientos';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { AsientosService } from '../asientos.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { PreReserva } from '../../../interfaces/reserva';
import { ReservaService } from '../../reserva/reserva.service';

@Component({
  selector: 'app-asientos-list',
  standalone: true,
  imports: [CommonModule, NgxLoadingModule],
  templateUrl: './asientos-list.component.html',
  styleUrl: './asientos-list.component.scss'
})
export class AsientosListComponent {
  loading = false;
  @Input() horarioId!: number;
  private _qty!: number
  @Input()
  set cantidad(value: number) {
    console.log('Cantidad máxima de asientos actualizada:', this._qty);
    this._qty = value
  }
  get qty() {
    return this._qty;
  }
  @Input() reservas!: PreReserva[]
  asientosLista: Asientos[] = [];
  asientosSeleccionados: Asientos[] = [];
  @Output() marcarAsientos = new EventEmitter<Asientos[]>();
  readonly service = inject(AsientosService);
  readonly alertService = inject(AlertService);
  readonly servicesReserva = inject(ReservaService);


  ngOnInit(): void {
    console.log(this.qty);

    if (this.horarioId) {
      this.loadAsientos(this.horarioId);
    }
  }

  seleccionarAsiento(asiento: Asientos): void {
    if (asiento.estado === 'disponible') {
      if (this.asientosSeleccionados.length + 1 <= this._qty) {
        this.asientosSeleccionados.push(asiento);
        asiento.estado = 'reservado';
      } else {
        this.alertService.alertWarning(`Solo puede seleccionar ${this._qty} asiento(s).`);
        return;
      }
    } else if (asiento.estado === 'reservado') {
      this.asientosSeleccionados = this.asientosSeleccionados.filter(a => a.id !== asiento.id);
      asiento.estado = 'disponible';

    }

    this.marcarAsientos.emit(this.asientosSeleccionados);
  }

  loadAsientos(horarioId: number): void {
    this.loading = true;
    this.service.list_asientos(horarioId).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.mapAsientos) {
          this.asientosLista = res.mapAsientos.map((a: Asientos) => {
            const reservado = this.servicesReserva.getAsientos().some((r: PreReserva) => r.asientos_id === a.id && r.horario_id === a.horario_id && a.estado == 'disponible')
            if (reservado) {
              this.asientosSeleccionados.push({
                ...a,
                estado: reservado ? 'reservado' : a.estado
              })

            }

            return {
              ...a,
              estado: reservado ? 'reservado' : a.estado
            };


          });
        }
        /* this.cantidad = this.asientosSeleccionados.length */
        this.marcarAsientos.emit(this.asientosSeleccionados);

      }, error: (err: any) => {
        this.loading = false;
        this.alertService.alertError(err.response || err);
      }
    });

  }
}

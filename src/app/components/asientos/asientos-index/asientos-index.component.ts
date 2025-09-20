import { Component, OnInit, inject } from '@angular/core';
import { AsientosService } from '../asientos.service';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertService } from '../../../core/services/alert/alert.service';
import { Asientos } from '../../../interfaces/asientos';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asientos-index',
  standalone: true,
  imports: [CommonModule, NgxLoadingModule, DragDropModule],
  templateUrl: './asientos-index.component.html',
  styleUrls: ['./asientos-index.component.scss']
})
export class AsientosIndexComponent implements OnInit {
  loading = false;
  readonly serviceAsientos = inject(AsientosService);
  readonly alertService = inject(AlertService);

  asientos: Asientos[] = [];
  distribucion: (Asientos | null)[][] = [];

  filas = 7;
  espaciosPorFila = 5;

  ngOnInit(): void {
    this.loadAsientos();
  }

  private loadAsientos(): void {
    this.loading = true;
    this.serviceAsientos.misAsientos(1).subscribe({
      next: (asientos: Asientos[]) => {
        this.loading = false;
        this.asientos = asientos;
        this.loaddistribucion();
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err.msg);
      }
    });
  }

  /** Genera la distribución de asientos con huecos */
  loaddistribucion() {
    this.distribucion = Array.from({ length: this.filas }, () => [] as (Asientos | null)[]);
    let index = 0;

    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.espaciosPorFila; c++) {
        // Última fila: siempre llena
        if (f === this.filas - 1 && index < this.asientos.length) {
          this.distribucion[f].push(this.asientos[index]);
          index++;
        }
        // Filas anteriores: ejemplo, columna 3 como hueco
        else if (f < this.filas - 1) {
          if (c === 2) {
            this.distribucion[f].push(null);
          } else if (index < this.asientos.length) {
            this.distribucion[f].push(this.asientos[index]);
            index++;
          } else {
            this.distribucion[f].push(null);
          }
        }
      }
    }
  }

  /** Solo asientos que no están en la tabla */
  get asientosLibres(): Asientos[] {
    const asientosEnTabla = this.distribucion.flat().filter(a => a !== null) as Asientos[];
    return this.asientos.filter(a => !asientosEnTabla.some(b => b.numero === a.numero));
  }
drop(event: CdkDragDrop<any[]>) {
  const filaDestino = event.container.data;

  // solo arrastramos elementos válidos
  const asiento = event.previousContainer.data[event.previousIndex];
  if (!asiento) return; // null no se mueve

  // mover dentro de la misma fila
  if (event.previousContainer === event.container) {
    const asientosFila = filaDestino.filter(a => a !== null);
    moveItemInArray(asientosFila, event.previousIndex, event.currentIndex);

    // luego reinsertar huecos
    let i = 0;
    filaDestino.forEach((v, idx) => {
      if (v !== null) {
        filaDestino[idx] = asientosFila[i++];
      }
    });
  }
  // mover entre filas
  else {
    const filaOrigen = event.previousContainer.data;
    // eliminar del array origen
    filaOrigen[event.previousIndex] = null;

    // colocar en el primer hueco disponible de la fila destino
    const hueco = filaDestino.findIndex(a => a === null);
    if (hueco !== -1) {
      filaDestino[hueco] = asiento;
      // eliminar del array de la lista lateral si viene de allí
      if (event.previousContainer.id === 'listaAsientos') {
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }
}


}

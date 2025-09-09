import { Component } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Ruta } from '../../../interfaces/ruta';
import { AgGridConfigService } from '../../../core/services/config-asgrid/ag-grid-config.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RutasService } from '../rutas.service';
import { RutasCreateComponent } from '../rutas-create/rutas-create.component';
import { RutasViewComponent } from '../rutas-view/rutas-view.component';
import { RutasUpdateComponent } from '../rutas-update/rutas-update.component';
import { AgGridAngular } from 'ag-grid-angular';
import { NgxLoadingModule } from 'ngx-loading';
@Component({
  selector: 'app-rutas-index',
  standalone: true,
  imports: [AgGridAngular, NgxLoadingModule],
  templateUrl: './rutas-index.component.html',
  styleUrl: './rutas-index.component.scss'
})
export class RutasIndexComponent {
  loading = false;
  rowData: Ruta[] = [];
  localeText: any;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 60 },
    { field: 'origen', headerName: 'Origen', minWidth: 120 },
    { field: 'destino', headerName: 'Destino', minWidth: 120 },
    { field: 'duracionEstimada', headerName: 'Duración estimada', minWidth: 100 },
    {
      headerName: 'Acciones',
      minWidth: 180,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams) => this.renderActionButtons(params)
    }
  ];

  constructor(
    private agGridConfig: AgGridConfigService,
    private services: RutasService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.localeText = this.agGridConfig.localeText;
    this.loadBuses();
  }

  private loadBuses(): void {
    this.loading = true;
    this.services.index().subscribe({
      next: (rutas: Ruta[]) => {
        this.rowData = rutas;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err);
      }
    });
  }

  create(): void {
    const modalRef = this.modalService.open(RutasCreateComponent, { size: 'md' });
    modalRef.result.then(() => this.loadBuses(), () => { });
  }

  view(ruta: Ruta): void {
    const modalRef = this.modalService.open(RutasViewComponent, { size: 'md' });
    modalRef.componentInstance.element = ruta;
  }

  edit(ruta: Ruta): void {
    const modalRef = this.modalService.open(RutasUpdateComponent, { size: 'md' });
    modalRef.componentInstance.element = ruta;
    modalRef.result.then(() => this.loadBuses(), () => { });
  }

  async delete(ruta: Ruta): Promise<void> {
    const confirmed = await this.alertService.alertConfirm(
      '¿Seguro que quieres eliminar esta ruta?',
      'Eliminar Bus'
    );
    if (!confirmed) return;
    if (!ruta?.id) {
      this.alertService.alertWarning('No se puede eliminar: la ruta no tiene un ID válido.');
      return;
    }

    this.loading = true;
    this.services.delete(ruta.id).subscribe({
      next: (res) => {
        this.alertService.alertSuccess(res.response);
        this.loadBuses();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err.response || err);
      }
    });
  }

  private renderActionButtons(params: ICellRendererParams): HTMLElement {
    const container = document.createElement('div');
    container.className = 'd-flex gap-2 justify-content-center';

    container.appendChild(this.createActionButton('Ver', 'btn-primary', () => this.view(params.data)));
    container.appendChild(this.createActionButton('Editar', 'btn-warning', () => this.edit(params.data)));
    container.appendChild(this.createActionButton('Eliminar', 'btn-danger', () => this.delete(params.data)));

    return container;
  }

  private createActionButton(label: string, btnClass: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = `btn btn-sm ${btnClass}`;
    button.textContent = label;
    button.title = label;
    button.addEventListener('click', onClick);
    return button;
  }


}

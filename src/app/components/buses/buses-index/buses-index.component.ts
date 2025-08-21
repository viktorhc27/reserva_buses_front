import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridConfigService } from '../../../core/services/config-asgrid/ag-grid-config.service';
import { Bus } from '../../../interfaces/bus';
import { BusesService } from '../buses.service';
import { NgxLoadingModule } from 'ngx-loading';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BusesCreateComponent } from '../buses-create/buses-create.component';
import { BusesUpdateComponent } from '../buses-update/buses-update.component';
import { BusesViewComponent } from '../buses-view/buses-view.component';

@Component({
  selector: 'app-buses-index',
  standalone: true,
  imports: [AgGridAngular, NgxLoadingModule],
  templateUrl: './buses-index.component.html',
  styleUrls: ['./buses-index.component.scss']
})
export class BusesIndexComponent {
  loading = false;
  rowData: Bus[] = [];
  localeText: any;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 60 },
    { field: 'patente', headerName: 'Patente', minWidth: 120 },
    { field: 'modelo', headerName: 'Modelo', minWidth: 120 },
    { field: 'capacidad', headerName: 'Capacidad', minWidth: 100 },
    { field: 'estado', headerName: 'Estado', minWidth: 100 },
    {
      headerName: 'Acciones',
      minWidth: 180,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams) => this.renderActionButtons(params)
    }
  ];

  constructor(
    private agGridConfig: AgGridConfigService,
    private busesService: BusesService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.localeText = this.agGridConfig.localeText;
    this.loadBuses();
  }

  private loadBuses(): void {
    this.loading = true;
    this.busesService.index().subscribe({
      next: (buses: Bus[]) => {
        this.rowData = buses;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err);
      }
    });
  }

  create(): void {
    const modalRef = this.modalService.open(BusesCreateComponent, { size: 'md' });
    modalRef.result.then(() => this.loadBuses(), () => { });
  }

  view(bus: Bus): void {
    const modalRef = this.modalService.open(BusesViewComponent, { size: 'md' });
    modalRef.componentInstance.element = bus;
  }

  edit(bus: Bus): void {
    const modalRef = this.modalService.open(BusesUpdateComponent, { size: 'md' });
    modalRef.componentInstance.element = bus;
    modalRef.result.then(() => this.loadBuses(), () => { });
  }

  async delete(bus: Bus): Promise<void> {
    const confirmed = await this.alertService.alertConfirm(
      '¿Seguro que quieres eliminar este bus?',
      'Eliminar Bus'
    );
    if (!confirmed) return;
    if (!bus?.id) {
      this.alertService.alertWarning('No se puede eliminar: el bus no tiene un ID válido.');
      return;
    }

    this.loading = true;
    this.busesService.delete(bus.id).subscribe({
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

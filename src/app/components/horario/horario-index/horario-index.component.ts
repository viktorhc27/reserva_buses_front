import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { NgxLoadingModule } from 'ngx-loading';
import { Horario } from '../../../interfaces/horario';
import { AgGridConfigService } from '../../../core/services/config-asgrid/ag-grid-config.service';
import { HorarioService } from '../horario.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HorarioCreateComponent } from '../horario-create/horario-create.component';
import { HorarioViewComponent } from '../horario-view/horario-view.component';
import { HorarioUpdateComponent } from '../horario-update/horario-update.component';

@Component({
  selector: 'app-horario-index',
  standalone: true,
  imports: [AgGridAngular, NgxLoadingModule],
  templateUrl: './horario-index.component.html',
  styleUrl: './horario-index.component.scss'
})
export class HorarioIndexComponent {
  loading = false;
  rowData: Horario[] = [];
  localeText: any;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 60 },
    { field: 'fechaSalida', headerName: 'Fecha Salida', minWidth: 120 },
    { field: 'horaSalida', headerName: 'Horario Salida', minWidth: 120 },
    { field: 'bus_id', headerName: 'Bus', minWidth: 100 },
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
    private services: HorarioService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.localeText = this.agGridConfig.localeText;
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.services.index().subscribe({
      next: (data: Horario[]) => {
        this.rowData = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err);
      }
    });
  }

  create(): void {
    const modalRef = this.modalService.open(HorarioCreateComponent, { size: 'md' });
    modalRef.result.then(() => this.loadData(), () => { });
  }

  view(bus: Horario): void {
    const modalRef = this.modalService.open(HorarioViewComponent, { size: 'md' });
    modalRef.componentInstance.element = bus;
  }

  edit(bus: Horario): void {
    const modalRef = this.modalService.open(HorarioUpdateComponent, { size: 'md' });
    modalRef.componentInstance.element = bus;
    modalRef.result.then(() => this.loadData(), () => { });
  }


  async delete(data: Horario): Promise<void> {
    const confirmed = await this.alertService.alertConfirm(
      '¿Seguro que quieres eliminar este elemento?',
      'Eliminar'
    );
    if (!confirmed) return;
    if (!data?.id) {
      this.alertService.alertWarning('No se puede eliminar: el elemento no tiene un ID válido.');
      return;
    }

    this.loading = true;
    this.services.delete(data.id).subscribe({
      next: (res) => {
        this.alertService.alertSuccess(res.response);
        this.loadData();
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

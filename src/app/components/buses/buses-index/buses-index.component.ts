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
  localeText: any;
  constructor(
    private agGridConfig: AgGridConfigService,
    private services: BusesService,
    private alert: AlertService,
    private modalService: NgbModal,

  ) {
    this.localeText = this.agGridConfig.localeText;
    this.loadDataIndex()
  }

  colDefs: ColDef[] = [
    { field: 'id', minWidth: 20, headerName: 'Id' },
    { field: 'patente', minWidth: 90, headerName: 'Patente' },
    { field: 'modelo', minWidth: 90, headerName: 'Modelo' },
    { field: 'capacidad', minWidth: 90, headerName: 'Capacidad' },
    { field: 'estado', minWidth: 90, headerName: 'Estado' },
    {
      headerName: 'Acciones',
      minWidth: 160,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.classList.add("d-flex", "flex-wrap", "gap-2", "justify-content-center");

        const verBtn = document.createElement('button');
        verBtn.className = 'btn btn-sm btn-outline-primary';
        verBtn.innerHTML = '<i class="fas fa-eye"></i>';
        verBtn.title = 'Ver';
        verBtn.addEventListener('click', () => this.onVer(params.data));

        const editarBtn = document.createElement('button');
        editarBtn.className = 'btn btn-sm btn-outline-warning';
        editarBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editarBtn.title = 'Editar';
        editarBtn.addEventListener('click', () => this.onEditar(params.data));

        const eliminarBtn = document.createElement('button');
        eliminarBtn.className = 'btn btn-sm btn-outline-danger';
        eliminarBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        eliminarBtn.title = 'Eliminar';
        eliminarBtn.addEventListener('click', () => this.onEliminar(params.data));

        container.appendChild(verBtn);
        container.appendChild(editarBtn);
        container.appendChild(eliminarBtn);

        return container;
      }

    }
  ];

  loadDataIndex() {
    this.loading = true;
    this.services.index().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.rowData = res
      }, error: (err: any) => {
        this.loading = false;
        console.log(err);
        this.alert.alertError(err)

      }
    });

  }

  rowData: Bus[] = [];

  create() {
    const modalRef = this.modalService.open(BusesCreateComponent, { size: 'md' });
    modalRef.result.then((result: any) => {
      this.loadDataIndex()
    }, (reason: any) => { });
  }

  // 🔹 Métodos de acción
  onVer(data: any) {
    const modalRef = this.modalService.open(BusesViewComponent, { size: 'md' });
    modalRef.componentInstance.element = data
    modalRef.result.then((result: any) => {
    }, (reason: any) => { });
  }

  onEditar(data: any) {
    const modalRef = this.modalService.open(BusesUpdateComponent, { size: 'md' });
    modalRef.componentInstance.element = data
    modalRef.result.then((result: any) => {
      this.loadDataIndex()
    }, (reason: any) => { });
  }

  async onEliminar(data: any) {
    const confirmado = await this.alert.alertConfirm(
      '¿Seguro que quieres eliminar este bus?',
      'Eliminar Bus'
    );

    if (!confirmado) return;
    this.loading = true;
    this.services.eliminar(data.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.alert.alertSuccess(res.response)
        this.loadDataIndex()
      }, error: (err: any) => {
        this.loading = false;
        if (err.response) this.alert.alertError(err.response)
      }
    });
  }
}

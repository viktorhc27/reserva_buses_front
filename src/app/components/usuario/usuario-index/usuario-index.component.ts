import { Component } from '@angular/core';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridConfigService } from '../../../core/services/config-asgrid/ag-grid-config.service';
import { UsuarioService } from '../usuario.service';
import { AlertService } from '../../../core/services/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../interfaces/usuario';
import { UsuarioCreateComponent } from '../usuario-create/usuario-create.component';
import { UsuarioViewComponent } from '../usuario-view/usuario-view.component';
import { UsuarioUpdateComponent } from '../usuario-update/usuario-update.component';
import { NgxLoadingModule } from 'ngx-loading';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-usuario-index',
  standalone: true,
  imports: [AgGridAngular, NgxLoadingModule],
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.scss'
})
export class UsuarioIndexComponent {
 loading = false;
  rowData: Usuario[] = [];
  localeText: any;

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 60 },
    { field: 'nombre', headerName: 'Nombre', minWidth: 120 },
    { field: 'apellido', headerName: 'Apellido', minWidth: 120 },
    { field: 'email', headerName: 'Email', minWidth: 180 },
    { field: 'telefono', headerName: 'Teléfono', minWidth: 120 },
    { field: 'rol', headerName: 'Rol', minWidth: 100 },
    {
      headerName: 'Acciones',
      minWidth: 180,
      suppressSizeToFit: true,
      cellRenderer: (params: ICellRendererParams) => this.renderActionButtons(params)
    }
  ];

  constructor(
    private agGridConfig: AgGridConfigService,
    private usuariosService: UsuarioService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.localeText = this.agGridConfig.localeText;
    this.loadUsuarios();
  }

  private loadUsuarios(): void {
    this.loading = true;
    this.usuariosService.index().subscribe({
      next: (usuarios: Usuario[]) => {
        this.rowData = usuarios;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.alertService.alertError(err);
      }
    });
  }

  create(): void {
    const modalRef = this.modalService.open(UsuarioCreateComponent, { size: 'md' });
    modalRef.result.then(() => this.loadUsuarios(), () => { });
  }

  view(usuario: Usuario): void {
    const modalRef = this.modalService.open(UsuarioViewComponent, { size: 'md' });
    modalRef.componentInstance.element = usuario;
  }

  edit(usuario: Usuario): void {
    const modalRef = this.modalService.open(UsuarioUpdateComponent, { size: 'md' });
    modalRef.componentInstance.element = usuario;
    modalRef.result.then(() => this.loadUsuarios(), () => { });
  }

  async delete(usuario: Usuario): Promise<void> {
    const confirmed = await this.alertService.alertConfirm(
      '¿Seguro que quieres eliminar este usuario?',
      'Eliminar Usuario'
    );
    if (!confirmed) return;
    if (!usuario?.id) {
      this.alertService.alertWarning('No se puede eliminar: el usuario no tiene un ID válido.');
      return;
    }

    this.loading = true;
    this.usuariosService.delete(usuario.id).subscribe({
      next: (res) => {
        this.alertService.alertSuccess(res.response);
        this.loadUsuarios();
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

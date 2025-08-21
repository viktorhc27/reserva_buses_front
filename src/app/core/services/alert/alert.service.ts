import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  alertSuccess(message: string, title: string = 'Éxito') {
    this.toastr.success(message, title);
  }

  alertError(message: string, title: string = 'Error') {
    this.toastr.error(message, title);
  }

  alertWarning(message: string, title: string = 'Advertencia') {
    this.toastr.warning(message, title);
  }

  alertInfo(message: string, title: string = 'Información') {
    this.toastr.info(message, title);
  }

  /**
    * Muestra un diálogo de confirmación con SweetAlert2.
    * Devuelve true si el usuario confirma, false si cancela.
    */
  async alertConfirm(message: string, title: string = 'Confirmar'): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true,
      focusCancel: true
    });

    return result.isConfirmed;
  }
}

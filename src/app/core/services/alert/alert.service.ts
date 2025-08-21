import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
}

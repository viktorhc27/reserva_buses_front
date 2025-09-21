import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SesionService } from '../../utils/sesion/sesion.service';
import { AlertService } from '../../core/services/alert/alert.service';
import { Router } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgxLoadingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;
  loginForm: FormGroup = new FormGroup({});
  readonly formBuilder = inject(FormBuilder);
  readonly sesionService = inject(SesionService);
  readonly alerts = inject(AlertService);
  readonly router = inject(Router);
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
    this.isLogged();
  }

  login() {
    this.loading = true;
    this.sesionService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        if (res.response) {
          this.router.navigate(['/']);
        } else {
          this.alerts.alertError(res.message)
        }


      }, error: (err: any) => {
        this.loading = false;
        this.router.navigate(['/login']);
        if (!err.response) this.alerts.alertSuccess('Error', err.msg ?? 'Error en la conexión con el servidor');
        else this.alerts.alertSuccess('Error', 'Error en la conexión con el servidor');
      }
    });
  }

  isLogged() {
    this.loading = true;
    this.sesionService.isLogged().subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res) {
          this.router.navigate(['/']);
          this.alerts.alertSuccess('Bienvenido');
        }

      }, error: (err) => {
        this.loading = false;
        this.router.navigate(['login']);
        console.log(err);
        if (err.response) this.alerts.alertSuccess('Error', err.msg ?? 'Error en la conexión con el servidor');
        else this.alerts.alertSuccess('Error', 'Error en la conexión con el servidor');
      }
    });
  }

}

import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SiderbarComponent } from "./layout/siderbar/siderbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiderbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reserva_buses_front';
}

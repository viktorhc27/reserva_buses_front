import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SiderbarComponent } from "../siderbar/siderbar.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SiderbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}

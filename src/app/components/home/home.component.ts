import { Component,AfterViewInit  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 ngAfterViewInit() {
    $('#bus-seat-map').seatCharts({
      map: [
        'ee__ee',
        'ee__ee',
        'ee__ee',
        'eeeeee'
      ],
      seats: {
        e: {
          classes: '',
          category: ''
        }
      },
      click: function () {
          console.log('Asiento clickeado:', this.settings);
        if (this.status() == 'available') {
          return 'selected';
        } else if (this.status() == 'selected') {
          return 'available';
        } else {
          return this.status();
        }
      }
    });
  }
}

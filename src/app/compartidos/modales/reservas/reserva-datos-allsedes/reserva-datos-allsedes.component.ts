import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-datos-allsedes',
  templateUrl: './reserva-datos-allsedes.component.html',
  styleUrls: ['./reserva-datos-allsedes.component.css']
})
export class ReservaDatosAllsedesComponent implements OnInit {

  tittle: string;
  dataTabla: any;

  view: [number, number] = [800, 400];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.tittle = 'Estadística de reservas por sede';
    this.dataTabla = data.data;
  }

  ngOnInit(): void {
  }

}

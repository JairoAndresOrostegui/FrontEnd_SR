import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalgraficotorta',
  templateUrl: './modalgraficotorta.component.html',
  styleUrls: ['./modalgraficotorta.component.css']
})
export class ModalgraficotortaComponent implements OnInit {

  view: [number, number] = [600, 600];

  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme: any = {
    domain: ['#EE2B7B', '#009EE2', '#BB00E6']
  };

  single = [
    {
      "name": "Principal",
      "value": 7
    },
    {
      "name": "Palo",
      "value": 2
    },
    {
      "name": "San Ignacio - Cosmos",
      "value": 10
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

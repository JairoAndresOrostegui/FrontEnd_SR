import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-modalgraficotorta',
  templateUrl: './modalgraficotorta.component.html',
  styleUrls: ['./modalgraficotorta.component.css']
})
export class ModalgraficotortaComponent implements OnInit {

  temp: number;
  tittle: string;
  data1: any;

  view: [number, number] = [800, 400];

  showLegend: boolean = true;
  showLabels: boolean = true;
  gradient: boolean = true;
  isDoughnut: boolean = false;

  showXAxis: boolean;
  showYAxis: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  showYAxisLabel: boolean;
  yAxisLabel: string;
  legendTitle: string;

  colorScheme1: any = {
    domain: ['#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B']
  };

  colorScheme2: any = {
    domain: ['#EE2B7B', '#009EE2', '#BB00E6']
  };

  colorScheme3: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage'
  };

  /*
  ocupacion = [
    {
      "name": "Principal",
      "value": 7
    },
    {
      "name": "Palo",
      "value": 0
    },
    {
      "name": "San Ignacio",
      "value": 0
    }
  ];
  */

  tiposUnidad = [
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

  programas = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.temp = data.temp;
    this.tittle = data.tittle;
    this.data1 = data.data;
    this.showXAxis = true;
    this.showYAxis = true;
    this.showXAxisLabel = true;
    this.xAxisLabel = 'Country';
    this.showYAxisLabel = true;
    this.yAxisLabel = 'Population';
    this.legendTitle = 'Years';
  }

  ngOnInit(): void {
  }

}

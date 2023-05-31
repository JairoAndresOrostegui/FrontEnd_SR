import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reserva-graficos-allsedes',
  templateUrl: './reserva-graficos-allsedes.component.html',
  styleUrls: ['./reserva-graficos-allsedes.component.css']
})
export class ReservaGraficosAllsedesComponent implements OnInit {

  tittle: string;
  dataModal: any;
  dataTable: any[] = [];
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

  view: [number, number] = [1000, 300];
  colorScheme: any = {
    domain: ['#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B', '#009EE2', '#BB00E6', '#EE2B7B']
  };

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.tittle = 'Reservas máximas por sede';
    this.dataModal = data.data;
    for (let item of this.dataModal) {
      const temp = {
        "name": item.nombre_sede.charAt(0).toUpperCase() + item.nombre_sede.slice(1),
        "series": [
          {
            "name": "Ocupación máxima",
            "value": (item.ocupacion_total*147)
          },
          {
            "name": "Ocupación actual",
            "value": (this.calcularEspacios(item))
          }
        ]
      }
      this.dataTable.push(temp);
    }
    this.showXAxis = true;
    this.showYAxis = true;
    this.showXAxisLabel = false;
    this.showYAxisLabel = false;
    this.xAxisLabel = 'Sedes';
    this.yAxisLabel = 'Ocupación';
    this.legendTitle = ''
  }

  ngOnInit(): void {
  }

  calcularEspacios(item: any): number {
    let conteo = item.informes.lunes_conteo_jornada1 + item.informes.lunes_conteo_jornada2 + item.informes.lunes_conteo_jornada3 +
        item.informes.martes_conteo_jornada1 + item.informes.martes_conteo_jornada2 + item.informes.martes_conteo_jornada3 +
        item.informes.miercoles_conteo_jornada1 + item.informes.miercoles_conteo_jornada2 + item.informes.miercoles_conteo_jornada3 +
        item.informes.jueves_conteo_jornada1 + item.informes.jueves_conteo_jornada2 + item.informes.jueves_conteo_jornada3 +
        item.informes.viernes_conteo_jornada1 + item.informes.viernes_conteo_jornada2 + item.informes.viernes_conteo_jornada3 +
        item.informes.sadado_conteo_jornada4 + item.informes.domingo_conteo_jornada5
    return (conteo);
  }

}

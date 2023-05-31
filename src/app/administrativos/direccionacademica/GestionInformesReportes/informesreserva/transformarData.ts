import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class logicaInformesData {

  convertirDataAllSedes(data: any): any {
    let newData: any[] = [];
    for (let item of data) {
      const temp = {
        "Sede": item.nombre_sede,
        "Espacios": item.ocupacion_total,
        "Lunes_mañana": item.informes.lunes_conteo_jornada1,
        "Lunes_tarde": item.informes.lunes_conteo_jornada2,
        "Lunes_noche": item.informes.lunes_conteo_jornada3,
        "Martes_mañana": item.informes.martes_conteo_jornada1,
        "Martes_tarde": item.informes.martes_conteo_jornada2,
        "Martes_noche": item.informes.martes_conteo_jornada3,
        "Miercoles_mañana": item.informes.miercoles_conteo_jornada1,
        "Miercoles_tarde": item.informes.miercoles_conteo_jornada2,
        "Miercoles_noche": item.informes.miercoles_conteo_jornada3,
        "Jueves_mañana": item.informes.jueves_conteo_jornada1,
        "Jueves_tarde": item.informes.jueves_conteo_jornada2,
        "Jueves_noche": item.informes.jueves_conteo_jornada3,
        "Viernes_mañana": item.informes.viernes_conteo_jornada1,
        "Viernes_tarde": item.informes.viernes_conteo_jornada2,
        "Viernes_noche": item.informes.viernes_conteo_jornada3,
        "Sadado": item.informes.sadado_conteo_jornada4,
        "Domingo": item.informes.domingo_conteo_jornada5
      }
      newData.push(temp);
    }
    return newData;
  }

}
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class logicaReserva {

  crearObjeto(reserva: any): any[] {
    var arraySemana= new Array(22);
    for(let i = 0; i < 22; i++) {
      arraySemana[i] = new Array(6);
      for(let j = 0; j < 6; j++) {
        arraySemana[i][j] = 0;
      }
    }
    for (let itemreserva of reserva) {
      for (let itemdia of itemreserva.reservaDias) {
        if (itemdia.reserva_dia_hora_inicio === 600) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][0] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][1] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[0][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 645) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[1][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 730) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[2][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 815) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[3][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 900) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[4][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 945) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[5][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1030) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[6][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1115) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[7][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1200) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[8][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1245) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[9][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1330) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[10][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1415) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[11][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1500) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[12][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1545) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[13][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1630) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[14][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1715) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[15][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1815) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][3] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][4] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[16][5] = objReserva;
            
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1900) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][0] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][1] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][2] = objReserva;
            
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][3] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][4] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[17][5] = objReserva;
          }
        } else if (itemdia.reserva_dia_hora_inicio === 1955) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][0] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][1] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][2] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][3] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][4] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[18][5] = objReserva;
          }
        } else if (itemdia.reserva_dia_hora_inicio === 2040) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][0] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][1] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][2] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][3] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][4] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[19][5] = objReserva;
          }
        } else if (itemdia.reserva_dia_hora_inicio === 2125) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][0] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][1] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][2] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][3] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][4] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[20][5] = objReserva;
          }
        } else if (itemdia.reserva_dia_hora_inicio === 2210) {
          if (itemdia.reserva_dia_dia === 'Lunes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][0] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Martes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][1] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Miércoles') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][2] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Jueves') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][3] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Viernes') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][4] = objReserva;
          } else if (itemdia.reserva_dia_dia === 'Sábado') {
            const objReserva = {
              Aula: itemreserva.nombre_unidad_organizacional,
              Inicia: itemreserva.fecha_inicio_reserva,
              Finaliza: itemreserva.fecha_fin_reserva,
              Responsable: itemreserva.nombre_usuario_colaborador,
              Dia: itemdia.reserva_dia_dia,
              HoraI: itemdia.reserva_dia_hora_inicio,
              //HoraF: itemdia.reserva_dia_hora_fin
            }
            arraySemana[21][5] = objReserva;
          }
        }
      }
    }
    return arraySemana;
  }

}
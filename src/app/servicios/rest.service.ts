import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login2 } from '../modelos/autenticacion/login2';
import { Rol } from '../modelos/autenticacion/rol';
import { Respuesta, Select } from '../modelos/genericos/listas';
import { ObtenerReserva } from '../modelos/reservas/reserva';
import { Unidad } from '../modelos/unidadesOrganizacionales/unidad';
import { Caracteristica, Tipoespaciofisico } from '../modelos/unidadesOrganizacionales/unidad';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiurl = environment.apiUrl;
  token: string = '';

  constructor(
    private http: HttpClient
  ) { }

  //Confirma las credenciales de autenticacion y trae toda su informaion y menu
  public login(url: string) {
    return this.http.get<Login2>(this.apiurl + url)
  }

  //Llenar los Select para los combobox
  public getselect(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Select>(this.apiurl + url, requestOptions);
  }

  //Servicios genericos de validar, crear, actualizar y eliminar
  public getvalidar(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<boolean>(this.apiurl + url, requestOptions);
  }

  public getId(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Number>(this.apiurl + url, requestOptions);
  }

  public create(url: string, body: any) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.post<Respuesta>(this.apiurl + url, body, requestOptions);
  }

  public update(url: string, body: any) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.put<Respuesta>(this.apiurl + url, body, requestOptions);
  }

  public delete(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.delete<Respuesta>(this.apiurl + url, requestOptions);
  }

  //Consumo de API para roles
  public getrol(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Rol>(this.apiurl + url, requestOptions);
  }

  //Consumo de API para unidades organizacionales
  public getunidad(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Unidad>(this.apiurl + url, requestOptions);
  }

  //Consumo de API para caracteristicas de espacios fisicos
  public getcaracteristica(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Caracteristica>(this.apiurl + url, requestOptions);
  }

  //Consumo de API para tipos de espacio fisico
  public gettipoespacio(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<Tipoespaciofisico>(this.apiurl + url, requestOptions);
  }

  //Consumo de API para reserva
  public postreserva(url: string, body: any) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.post<any>(this.apiurl + url, body, requestOptions);
  }

  public gettodasreserva(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<ObtenerReserva>(this.apiurl + url, requestOptions);
  }
}

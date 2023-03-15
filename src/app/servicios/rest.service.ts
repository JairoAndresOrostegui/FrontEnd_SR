import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../modelos/autenticacion/login';
import { Rol } from '../modelos/autenticacion/rol';
import { Respuesta } from '../modelos/genericos/listas';
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
  public login(url: string, body: any) {
    return this.http.get<Login>(this.apiurl + url, body)
  }

  //Servicios genericos de validar, crear, actualizar y eliminar
  public getvalidar(url: string) {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    const requestOptions = { headers: headers };
    return this.http.get<boolean>(this.apiurl + url, requestOptions);
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
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../modelos/login';
import { Rol } from '../modelos/rol';
import { Unidad } from '../modelos/unidad';

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
    return this.http.post<Login>(this.apiurl + url, body)
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
}

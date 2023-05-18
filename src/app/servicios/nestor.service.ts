import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NestorService {

  private apirUrlNestor = environment.apirUrlNestor;
  token: string = '';

  constructor(
    private http: HttpClient
  ) { }

  //Llenar los Select para los combobox de sede
  public getInfo(url: string) {
    return this.http.get<any>(this.apirUrlNestor + url);
  }

}
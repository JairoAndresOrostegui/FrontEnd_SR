import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  tipoinput: string;

  constructor() {
    this.tipoinput = 'password';
  }

  ngOnInit(): void {
  }

  cambiartipo(): void {
    if (this.tipoinput === 'password') {
      this.tipoinput = 'text';
    } else {
      this.tipoinput = 'password';
    }
  }

}

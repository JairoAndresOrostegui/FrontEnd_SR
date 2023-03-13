import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent implements OnInit {

  login: FormGroup;

  tipoinput: string;

  constructor(private fb: FormBuilder) {
    this.tipoinput = 'password';
    this.login = this.fb.group ({
      usuario: '',
      contraseña: ''
    })
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

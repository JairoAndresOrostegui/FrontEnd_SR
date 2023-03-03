import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piecera',
  templateUrl: './piecera.component.html',
  styleUrls: ['./piecera.component.css']
})
export class PieceraComponent implements OnInit {

  year = new Date();
  anioActual = this.year.getFullYear();
  
  constructor() { }

  ngOnInit(): void {
  }

}

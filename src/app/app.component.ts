import { Component } from '@angular/core';
import { RestService } from './servicios/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd_SR';

  constructor(public _peticion: RestService) { }
}

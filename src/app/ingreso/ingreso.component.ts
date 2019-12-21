import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  public ingreso:any = {};
  constructor(public router: Router) { }

  ngOnInit() {
    this.ingreso.tipoImputado = '';
  }

  submit(){
    console.log("entra al metodo")
    localStorage.setItem("ingreso",JSON.stringify(this.ingreso));
    console.log (this.ingreso);
    this.router.navigate(['/dashboard/datosAnexos/'])
  }

}

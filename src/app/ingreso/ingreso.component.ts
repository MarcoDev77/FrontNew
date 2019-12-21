import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.scss']
})
export class IngresoComponent implements OnInit {
  public ingreso: any = {};

  constructor() {
    this.ingreso.tipoInputado = '';
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.ingreso);
  }

}

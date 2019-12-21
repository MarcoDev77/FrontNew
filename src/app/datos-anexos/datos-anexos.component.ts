import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrls: ['./datos-anexos.component.scss']
})
export class DatosAnexosComponent implements OnInit {
  public ingreso: any ={};
  constructor(public router: Router) { }

  ngOnInit() {
    this.ingreso = JSON.parse(localStorage.getItem('ingreso'));

  }
  submit(){
    this.router.navigate(['/dashboard/dactiloscopia/'])
  }
}

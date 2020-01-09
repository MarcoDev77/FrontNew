import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import Swal from 'sweetalert2'
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
    console.log(":)")
    // Swal.fire(
    //   'Guardado',
    //   'Datos guardados con exito',
    //   'success'
    //
    // );
    this.router.navigate(['/dashboard/dactiloscopia/'])
  }
}

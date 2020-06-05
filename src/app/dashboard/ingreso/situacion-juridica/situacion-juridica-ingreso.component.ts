import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '@shared/models/Ingreso';
import { Router } from '@angular/router';
import { IngresoService } from '@shared/services/ingreso.service';
import { Imputado } from '@shared/models/Imputado';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-situacion-penal',
  templateUrl: './situacion-juridica-ingreso.component.html',
  styleUrls: ['./situacion-juridica-ingreso.component.scss']
})
export class SituacionJuridicaComponent implements OnInit {
  public ingreso:any

  constructor(private router: Router,private modalService: NgbModal, private ingresoService: IngresoService) {
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    console.log("Ingreso",this.ingreso)
   }

  ngOnInit() {
  }



  submit(){
    let model={
      imputadoId: this.ingreso.id,
      esTraslado: this.ingreso.esTraslado,
      centroOrigen: this.ingreso.centroOrigen,
      dormitorio: this.ingreso.dormitorio
    }
    console.log(model)
    this.ingresoService.editTraslado(model).subscribe((data: any) => {
      if(!data.error){
        sessionStorage.setItem('ingreso', JSON.stringify(this.ingreso));

      }
      console.log('saveIngreso', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {

      }
    });
  }
  viewHistory(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  delitoEdit(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  goTo(uri: string, ingreso: Ingreso) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }



 /*  getIngreso(){
    this.ingresoService.getIngreso(this.ingreso.id).subscribe((data:any)=>{
      console.log("getData", data)
      this.ingreso=data.ingreso;
      this.ingreso.apodo.nombre= this.ingreso.imputado.apodo[0].nombre;
      this.ingreso.apodo.apellidoPaterno= this.ingreso.imputado.apodo[0].apellidoPaterno;
      this.ingreso.apodo.apellidoMaterno= this.ingreso.imputado.apodo[0].apellidoMaterno;

      console.log("ingreso", this.ingreso)

    })
  } */

  add(){}
  switch($event){}
}


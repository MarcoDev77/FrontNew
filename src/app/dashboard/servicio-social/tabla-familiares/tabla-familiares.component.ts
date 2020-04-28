import { Component, OnInit } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { IngresoService } from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla-familiares',
  templateUrl: './tabla-familiares.component.html',
  styleUrls: ['./tabla-familiares.component.scss']
})
export class TablaFamiliaresComponent implements OnInit {
  public familiar : Familiar
  public parentescos: any[]
  public familiares: any[];
  //Table atributess
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;
  constructor(private servicioSocialService: ServicioSocialService, private ingresoService: IngresoService, private modalService: NgbModal) {
    this.familiar= {} as any;
    this.familiares= [];
   }

  ngOnInit() {
  }



  getParentescos(){
    this.ingresoService.getParentescos().subscribe((data: any)=>{
      this.parentescos=data.parentescos
    })
  }

  saveFamiliar(array: any[]){
    if (this.validateFiels(array)) {
      this.servicioSocialService.saveMiembroNucleoFamiliar(this.familiar).subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
       
      });
    }
  }

 
  deleteAntecedente(item){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro se eliminara.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.servicioSocialService.deleteMiembroNucleoFamiliar(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              //this.cancel();
             // this.getData(false);
            }
          });
        });
      }
    });
  }


//Table methods
validateFiels(array: any[]): boolean {
  let pass = true;
  for (const field of array) {
    if (!field.valid) {
      pass = false;
      field.control.markAsTouched();
    }
  }
  return pass;
}

sort(key) {
  if (key === this.key) {
    this.reverse = !this.reverse;
    if (this.reverse === false) {
      this.key = 'id';
      this.reverse = true;
    }
  } else {
    this.key = key;
    this.reverse = false;
  }
}


add() {
  this.familiar = {} as any;
  this.isForm = true;
}



}

class Familiar {
  id:number
  nombre: String
  parentesco: any
  ocupacion: String
  estadoCivil: String
  escolaridad: String
  edad: number
  imputadoId: number
}
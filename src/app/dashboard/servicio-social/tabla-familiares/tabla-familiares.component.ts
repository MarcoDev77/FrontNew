import { Component, OnInit, Input } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { IngresoService } from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogosService } from '@shared/services/catalogos.service';

@Component({
  selector: 'app-tabla-familiares',
  templateUrl: './tabla-familiares.component.html',
  styleUrls: ['./tabla-familiares.component.scss']
})
export class TablaFamiliaresComponent implements OnInit {
  @Input() tipoNucleo: string;
  @Input() nucleoId: number;
  public isLoading:boolean
  public familiar : any
  public parentescos: any[]
  public familiares: any[];
  public tituloModal: string
  public estadosCiviles: any[];
  //Table atributess
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;

  constructor(private servicioSocialService: ServicioSocialService,
     private ingresoService: IngresoService,
    private  catalogosService: CatalogosService,private modalService: NgbModal) {
    this.familiar= {} as any;
    this.familiares= [];
    this.estadosCiviles=[];
    this.familiar.parentesco = {} as any
    this.familiar.estadoCivil={} as any
   }

  ngOnInit() {
    this.getFamiliares();
    this.getParentescos();
    this.getEstadosCiviles();
  }



  getParentescos(){
    this.ingresoService.getParentescos().subscribe((data: any)=>{
      console.log(data)
      this.parentescos=data.parentescos
    })
  }

  getEstadosCiviles(){
    this.catalogosService.listEstadosCiviles().subscribe((data:any)=>{
      console.log(data);
      this.estadosCiviles=data.estadosCiviles
    })
  }

  getFamiliares(){
    let model={
      tipoNucleo: this.tipoNucleo,
      nucleoId: this.nucleoId,
    }
    this.servicioSocialService.getMiembrosNucleoFamiliar(model).subscribe((data:any)=>{
      console.log(data)
      this.familiares=data.miembrosNucleo;
    })
  }

  saveFamiliar(){
    this.familiar.nucleoFamiliar={id: this.nucleoId};
    this.familiar.tipoNucleo= this.tipoNucleo;
      this.servicioSocialService.saveMiembroNucleoFamiliar(this.familiar).subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        this.getFamiliares()
        this.modalService.dismissAll();
      });
    
  }

 
  deleteFamiliar(item){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro se eliminara.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.servicioSocialService.deleteMiembroNucleoFamiliar(item).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Eliminación exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              //this.cancel();
             this.getFamiliares();
            }
          });
        });
      }
    });
  }


//Table methods

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
  this.tituloModal="Registrar familiar"
  this.familiar = {} as any;
  this.familiar.parentesco={} as any
  this.familiar.estadoCivil={} as any
}

updateFamiliar(familiar){
  this.tituloModal="Modificar familiar"
  this.familiar=familiar
}
switch($event){}

openModal(modal){
  this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });}
}

class Familiar {
  id:number
  nombre: String
  parentesco: any
  ocupacion: String
  estadoCivil: any
  escolaridad: String
  edad: number
  imputadoId: number
  tipoNucleo: string
  nucleoFamiliar: any
}
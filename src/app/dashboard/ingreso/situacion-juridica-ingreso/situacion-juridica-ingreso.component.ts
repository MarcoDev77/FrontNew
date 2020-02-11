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
export class SituacionJuridicaIngresoComponent implements OnInit {
  public ingreso:Ingreso
  public apodos:any[];
  public nombre;
  public primerApellido;
  public segundoApellido;
  public alias;
  public situacionJuridica: SituacionJuridica
  constructor(private router: Router,private modalService: NgbModal, private ingresoService: IngresoService) {
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    console.log(this.ingreso)
    this.situacionJuridica= {} as any;
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.ingresoService.getSituacionJuridica(this.ingreso.id).subscribe((data: any) => {
      this.ingreso=data.ingreso;
      this.apodos=data.ingreso.imputado.apodos;
     console.log(this.ingreso)
     this.getNombrePrincipal();

    })
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

  getNombrePrincipal(){
    console.log("entra")
    this.apodos.forEach(apodo => {
        if (apodo.principal){
          this.nombre=apodo.nombre;
          this.primerApellido=apodo.apellidoPaterno;
          this.segundoApellido=apodo.apellidoMaterno;
          this.alias=apodo.otro
        }
    });
  }
  saveSituacionJuridica(){
    console.log(this.situacionJuridica)
    this.situacionJuridica.causaPenal="causa penal1"
    this.situacionJuridica.imputado={
      id:this.ingreso.id
    }
    this.ingresoService.saveSituacionJuridica(this.situacionJuridica).subscribe((data: any) => {
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }
}

class SituacionJuridica{
  public victimaAgravio?: string
  public aPartir: Date;
  public juzgado: String
  public penalidadAnio: number
  public penalidadMes: number
  public penalidadDia: number
  public multa: number
  public reparacionDanio: String
  public tipoProceso: String
  public sentenciaEjecutoriada: Date
  public observaciones: String
  public fechaPurga: Date
  public causaPenal: String
  public imputado: any
}
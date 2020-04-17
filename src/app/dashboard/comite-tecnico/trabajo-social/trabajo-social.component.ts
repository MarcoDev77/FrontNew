import { Component, OnInit } from '@angular/core';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajo-social',
  templateUrl: './trabajo-social.component.html',
  styleUrls: ['./trabajo-social.component.scss']
})
export class TrabajoSocialComponent implements OnInit {
  public isLoading: false;
  public generalidadesPPL: GeneralidadesPPL;
  
  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidadesPPL= {} as any
    this.generalidadesPPL.estadoCivil= {} as any
    
    this.isLoading=false;
  }

  ngOnInit() {
  
  }


  searchImputado(){
    this.comiteTecnicoService.getImputadoByFolioTrabajoSocial(this.generalidadesPPL.folio).subscribe((data:any)=>{
      console.log(data);
      this.generalidadesPPL=data.imputado;
        Swal.fire({
          title: data.error ? 'Error!' : 'Busqueda',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1000,
          showConfirmButton: false
        });
    })
  }

  change($event){}
}

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: string;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
  ficha:any;
  imputado: any;
  
}

class Actividad {
  actividadRealiza: String;
  tallerAsignado: String
  diaTaller: String
  horarioTaller: String
  fechaInicio: String
  lugar: String
  observaciones: String;
  visitaIntima: String;
 diaVisitaIntima: String
  horarioVisitaIntima: String
 visitaFamiliar: String
 frecuencia: String
 diaVisitaFamiliar: String
  parentesco: String
  imputado:any;
}
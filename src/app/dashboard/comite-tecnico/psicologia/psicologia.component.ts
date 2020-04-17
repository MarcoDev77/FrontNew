import { Component, OnInit } from '@angular/core';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-psicologia',
  templateUrl: './psicologia.component.html',
  styleUrls: ['./psicologia.component.scss']
})
export class PsicologiaComponent implements OnInit {
  public generalidadesPPL: GeneralidadesPPL;
  public isLoading: boolean;
  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidadesPPL= {} as any;
    this.generalidadesPPL.ficha= {} as any;
    this.isLoading=false;

   }

  ngOnInit() {
  }

  searchImputado(){
    this.comiteTecnicoService.getImputadoByFolioPsicologia(this.generalidadesPPL.folio).subscribe((data:any)=>{
      console.log("getData",data)
      this.generalidadesPPL=data.imputado
    })
  }

  saveFicha(){
    this.generalidadesPPL.imputado={
      id:this.generalidadesPPL.imputadoId
    }
    this.comiteTecnicoService.saveFichaPsicologica(this.generalidadesPPL).subscribe((data:any)=>{
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

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: any;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
  ficha:any
  imputado: any
}
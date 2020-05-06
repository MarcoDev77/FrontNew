import { Component, OnInit } from '@angular/core';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-psicologia',
  templateUrl: './psicologia.component.html',
  styleUrls: ['./psicologia.component.scss']
})
export class PsicologiaComponent implements OnInit {
  public generalidadesPPL: GeneralidadesPPL;
  public isLoading: boolean;
  public file:any;
  constructor(private comiteTecnicoService: ComiteTecnicoService, private modalService: NgbModal) {
    this.generalidadesPPL= {} as any;
    this.generalidadesPPL.ficha= {} as any;
    this.isLoading=false;

   }

  ngOnInit() {
  }

  searchImputado(){
    this.comiteTecnicoService.getImputadoByFolioPsicologia(this.generalidadesPPL.folio).subscribe((data:any)=>{
      console.log("getData",data)
      if(!data.error){
        this.generalidadesPPL=data.imputado
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    })
  }

  saveFicha(){
    this.generalidadesPPL.ficha.imputado={
      id:this.generalidadesPPL.imputadoId
    }
    this.comiteTecnicoService.saveFichaPsicologica(this.generalidadesPPL.ficha).subscribe((data:any)=>{
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
  
  generatePDF(modal) {
    console.log('generatePDF');
    this.comiteTecnicoService.generatePDFPsicologia(this.generalidadesPPL.imputadoId).subscribe((data: any) => {
      console.log('PDF', data);
      this.isLoading = false;
      const file = new Blob([data], {type: 'application/*'});
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = ev => this.isLoading = true;
      reader.onloadend = () => {
        this.isLoading = false;
        let dataUrl: any;
        dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1];
        this.modalService.dismissAll();
        if (base64) {
          this.file = base64;
          this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary'});
        }
      };
      reader.onerror = () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Error al generar el archivo',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
        this.modalService.dismissAll();
      };
    }, error => {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }

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
  ficha:any
  imputado: any
}
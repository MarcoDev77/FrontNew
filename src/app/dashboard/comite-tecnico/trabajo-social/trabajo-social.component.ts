import { Component, OnInit } from '@angular/core';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import { IngresoService } from '@shared/services/ingreso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trabajo-social',
  templateUrl: './trabajo-social.component.html',
  styleUrls: ['./trabajo-social.component.scss']
})
export class TrabajoSocialComponent implements OnInit {
  public isLoading: boolean;
  public generalidadesPPL: GeneralidadesPPL;
  public actividad: Actividad;
  public parentescos: any[]
  public file: any

  constructor(private comiteTecnicoService: ComiteTecnicoService, private ingresoService: IngresoService
    , private modalService: NgbModal) {
    this.generalidadesPPL = {} as any
    this.generalidadesPPL.estadoCivil = {} as any
    this.actividad = {} as any
    this.actividad.parentesco = {} as any
    this.isLoading = false;
    this.parentescos = []
  }

  ngOnInit() {
    this.getParentescos();
  }


  searchImputado() {
    this.comiteTecnicoService.getImputadoByFolioTrabajoSocial(this.generalidadesPPL.folio).subscribe((data: any) => {
      if (!data.error) {
        this.generalidadesPPL = data.imputado;
        this.actividad = data.imputado.actividades
        if (!this.actividad.parentesco) {
          this.actividad.parentesco = {} as any
        }
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



  getParentescos() {
    this.ingresoService.getParentescos().subscribe((data: any) => {
      this.parentescos = data.parentescos
    })
  }

  saveActividad() {
    this.actividad.imputado = { id: this.generalidadesPPL.imputadoId }
    this.comiteTecnicoService.saveActividadestrabajoSocial(this.actividad).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })

  }
  change($event) { }


  generatePDF(modal) {
    this.comiteTecnicoService.generatePDFTrabajoSocial(this.generalidadesPPL.imputadoId).subscribe((data: any) => {
      this.isLoading = false;
      const file = new Blob([data], { type: 'application/*' });
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
          this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
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
  ficha: any;
  imputado: any;

}

class Actividad {
  id: number;
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
  parentesco: any
  imputado: any;
}

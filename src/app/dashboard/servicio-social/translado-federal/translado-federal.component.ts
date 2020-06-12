import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-translado-federal',
  templateUrl: './translado-federal.component.html',
  styleUrls: ['./translado-federal.component.scss']
})
export class TransladoFederalComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public isLoading: boolean
  public traslado: Traslado
  public file: any
  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) 
    {
      this.ingreso={} as any
      this.ingreso.nucleoFamiliar={} as any
      this.traslado={} as any
      this.isLoading= false;
     }

  ngOnInit() {
  }

  searchImputado(ingreso?) {
    console.log(ingreso)
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }  
    this.isLoading = true
    this.servicioSocialService.getInfoTrasladoFederal(this.ingreso.folio).subscribe((data: any) => {
      console.log(data)
      if(!data.error){
        this.ingreso = data.imputado
        this.traslado=data.imputado.trasladoFederal
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.isLoading = false
    })
  }

  saveTrasladoFederal(){
    this.isLoading=true
    this.traslado.imputado={
      id: this.ingreso.imputadoId
    }
    console.log(this.traslado)
    this.servicioSocialService.saveTrasladofederal(this.traslado).subscribe((data: any)=>{
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.isLoading = false
    })

  }
  

  cleanForm() {
    this.ingreso={} as any
    this.ingreso.nucleoFamiliar={} as any
    this.traslado={} as any
    this.isLoading= false;
  }

  generatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFTrasladoFederal(this.ingreso.imputadoId)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.showPreview(data, modal);
      }, error => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Error al generar el documento.',
          icon: 'error',
          timer: 1000,
          showConfirmButton: false
        });
      });
  }

  showPreview(data, modal) {
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
  }
}

class Traslado {
  direccionPrevia: String
  ocupacionPrevia: String
  tiempoLaboral: String
  sueldo: String
  tipoZona: String
  indicesDelictivos: Boolean
  sobrePoblacion: Boolean
  girosNegros: Boolean
  presenciaPoliciaca: Boolean
  consumoViaPublica: Boolean
  tipoFamilia: String
  tipoComunicacionPrimaria: String
  tipoRelacionFamiliarPrimaria: String
  nivelSocioEconomico: String
  usoDrogasFamilia: String
  tipoSustancia: String
  miembroFamiliarDetenido: String
  tipoDelitoDuracionLugar: String
  tipoComunicacionSecundaria: String
  tipoRelacionFamiliarSecundaria: String
  situacionFamiliar: String
  municipioPrimaria: String
  municipioSecundaria: String
  apoyoExterior: String
  residiraEgresarReclucion: String
  dondeResidiraEgresarReclucion: String
  opinionEvolucionInterno: String
  opinionSobreTraslado: String
  imputado: any
}

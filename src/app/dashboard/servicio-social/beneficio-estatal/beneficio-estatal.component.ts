import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { CatalogosService } from '@shared/services/catalogos.service';

@Component({
  selector: 'app-beneficio-estatal',
  templateUrl: './beneficio-estatal.component.html',
  styleUrls: ['./beneficio-estatal.component.scss']
})
export class BeneficioEstatalComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public isLoading: boolean
  public beneficio: BeneficioEstatal
  public parentescos: []
  public file: any
  constructor(
    private servicioSocialService: ServicioSocialService,
    private catalogoService: CatalogosService,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.ingreso = {} as any
    this.beneficio = {} as any
    this.beneficio.parentesco = {} as any
    this.getParentescos()

  }

  getParentescos() {
    this.catalogoService.getParentescos().subscribe((data: any) => {
      this.parentescos = data.parentescos;
    });
  }
  searchImputado(ingreso?) {
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true
    this.servicioSocialService.getInfoBeneficioEstatal(this.ingreso.folio).subscribe((data: any) => {
      console.log(data)
      if (!data.error) {
        this.ingreso = data.imputado
        if (data.beneficioEstatal != null) {
          this.beneficio = data.imputado.beneficioEstatal
        }
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

  saveBeneficioEstatal() {
    this.isLoading = true
    this.beneficio.imputado = {
      id: this.ingreso.imputadoId
    }
    console.log(this.beneficio)
    this.servicioSocialService.saveBeneficioEstatal(this.beneficio).subscribe((data: any) => {
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

  }
  generatePDF(modal) {
    this.isLoading = true;
    //TODO: Cambiar por el metodo correspondiente
    this.servicioSocialService.generarFormatoPdfTrabajoSocial(this.ingreso.imputadoId)
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

class BeneficioEstatal {
  relacionInterfamiliarPrimario: String
  grupoFamiliarPrimario: String
  violenciaIntrafamiliarPrimario: Boolean
  violenciaEspecificarPrimario: String
  nivelSocioeconomicoPrimario: String
  familiarAntecedentesAdiccionPrimario: String
  familiarEspecifiquePrimario: String
  hijosAnteriores: number
  grupoFamiliarSecundario: String
  relacionInterfamiliarSecundario: String
  violenciaIntrafamiliarSecundario: Boolean
  violenciaEspecificarSecundario: String
  nivelSocioeconomicoSecundario: String
  relacionMedioExterno: String
  familiarAntecedentesAdiccionSecundario: String
  familiarEspecifiqueSecundario: String
  familiaConductaAntisocial: String
  conductaAntisocialEspecifique: String
  numeroParejasEstables: Number
  apoyoFamiliar: Boolean
  visitaFamiliar: Boolean
  frecuencia: String
  visitadoPersonas: Boolean
  diagnosticoPronostico: String
  opinionBeneficiosInternos: String
  radicaEstado: boolean
  parentesco: any
  imputado: any
}

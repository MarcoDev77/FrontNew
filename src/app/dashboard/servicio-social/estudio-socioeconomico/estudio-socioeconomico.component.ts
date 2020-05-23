import { Component, OnInit } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-estudio-socioeconomico',
  templateUrl: './estudio-socioeconomico.component.html',
  styleUrls: ['./estudio-socioeconomico.component.scss']
})
export class EstudioSocioeconomicoComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public estudio: any
  public isLoading: boolean
  // File preview
  public file: any;
  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
    this.cleanForm();
    this.moreInputs = [
      // { label: 'Ocupación', value: 'Carpintero' },
      // { label: 'Domicilio', value: 'a' },
      // { label: 'Lugar nacimiento', value: 'Mexico' },
      // { label: 'Dialecto', value: 'Español' },
    ];
  }

  ngOnInit() {
  }

  searchImputado(imputado?) {
    if (imputado) {
      this.ingreso = { ...imputado };
    }
    this.isLoading = true;
    this.servicioSocialService.getEstudioSocioEconomico(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log(data)
      if (!data.error) {
        this.ingreso = data.imputado;
        this.estudio = data.imputado.estudioSocioeconomico;
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
      this.cleanForm();
      Swal.fire({
        title: 'Error!',
        text: 'Error al realizar la búsqueda.',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    })
  }

  cleanForm() {
    this.isLoading = false;
    this.ingreso = {} as any
    this.estudio = {} as any
  }

  saveEstudioSocioeconomico() {
    this.isLoading = true;
    this.estudio.imputado = { id: this.ingreso.imputadoId }
    console.log("To server", this.estudio)
    this.servicioSocialService.saveEstudioSocioeconomico(this.estudio).subscribe((data: any) => {
      this.isLoading = false;
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, error => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Error al guardar',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  generatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFEstudioSocieconomico(this.ingreso.imputadoId)
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

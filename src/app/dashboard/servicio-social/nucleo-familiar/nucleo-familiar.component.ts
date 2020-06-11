import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { NucleoFamiliar } from '@shared/models/NucleoFamiliar';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
import { CatalogosService } from '@shared/services/catalogos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.scss']
})
export class NucleoFamiliarComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public nucleo: NucleoFamiliar;
  public imputado: any;
  public parentescos = [];
  public estados = [];
  // File preview
  public file: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private catalogoService: CatalogosService,
    private modalService: NgbModal) {
    this.cleanForm();
  }

  ngOnInit() {
    this.getParentescos();
    this.getEstados();
  }

  searchImputado(imputado?) {
    console.log(imputado);

    this.isLoading = true;
    this.servicioSocialService.getInfoNucleoFamiliar(this.ingreso.folio || imputado.folio).subscribe((data: any) => {
      console.log('data', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.imputado = data.nucleoFamiliar.imputado;
        this.nucleo = data.nucleoFamiliar;
      }
    }, this.handleErrorSearch);
  }

  handleErrorSearch(error?) {
    if (error) {
      console.log(error);
    }
    Swal.fire({
      title: 'Error!',
      text: 'Consulta fallida',
      icon: 'error',
      timer: 1000,
      showConfirmButton: false
    });
    this.cleanForm();
  }

  cleanForm() {
    this.isLoading = false;
    this.ingreso = {} as Ingreso;
    this.imputado = {} as any;
    this.nucleo = new NucleoFamiliar();
    this.nucleo.parentescoAvalMoral = {} as any;
    this.nucleo.parentescoVivira = {} as any;
    this.nucleo.estadoVivira = {} as any;
    this.nucleo.estadoAval = {} as any;
  }

  submit() {
    console.log('submit', this.nucleo);
    this.servicioSocialService.saveNucleoFamiliar(this.nucleo).subscribe((data: any) => {
      console.log('Response', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    });
  }

  genetatePDF(modal) {
    this.isLoading = true;
    this.servicioSocialService.generatePDFEstudioTrabajoSocial(this.imputado.id).subscribe((data: any) => {
      console.log('preview', data);
      this.isLoading = false;
      this.showPreview(data, modal);
    }, error => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'error al generar el documento',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
      console.log(error);

    });
  }

  getEstados() {
    this.catalogoService.listEstados('mexico', null).subscribe((data: any) => {
      this.estados = data.estados;
    });
  }

  getParentescos() {
    this.catalogoService.getParentescos().subscribe((data: any) => {
      this.parentescos = data.parentescos;
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

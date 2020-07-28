import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { ControlEntrevista } from '@shared/models/ControlEntrevista';
import { error } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-entrevista',
  templateUrl: './control-entrevista.component.html',
  styleUrls: ['./control-entrevista.component.scss']
})
export class ControlEntrevistaComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public entrevista: ControlEntrevista;
  public entrevistas: ControlEntrevista[];
  // File preview
  public file: any;
  // Table attributes
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: number;
  public setClickedRow: (i) => void;
  public auxId: any;

  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;
    this.entrevista = {} as ControlEntrevista;
    this.entrevistas = [];
  }

  ngOnInit() {
  }

  searchImputado(ingreso?) {
    this.isLoading = true;
    this.servicioSocialService.getImputadoByFolio(this.ingreso.folio || ingreso.folio).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      this.isLoading = false;
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
        this.listEntrevistas(this.ingreso.imputado.id);
      } else {
        this.ingreso = {} as Ingreso;
        this.entrevista = {} as ControlEntrevista;
        this.entrevistas = [];
      }
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.ingreso = {} as Ingreso;
    });
  }

  cleanForm() {
    this.ingreso = {} as Ingreso;
    this.entrevista = {} as ControlEntrevista;
    this.entrevistas = [];
  }

  listEntrevistas(imputadoId) {
    this.servicioSocialService.getEntrevistasImputado(imputadoId).subscribe((data: any) => {
      console.log('entrevistas', data);
      this.entrevistas = data.entrevistas;
    });
  }

  saveEntrevista(inputs) {
    if (this.validateFiels(inputs)) {
      this.entrevista.imputado = { id: this.ingreso.imputado.id };
      this.servicioSocialService.saveEntrevistaImputado(this.entrevista).subscribe((data: any) => {
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        })
        if (!data.error) {
          this.listEntrevistas(this.ingreso.imputado.id);
          this.entrevista = {} as ControlEntrevista;
          this.modalService.dismissAll();
        }
      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar',
          icon: 'error',
          timer: 1300,
          showConfirmButton: false
        })
      });
    }
  }

  updateEntrevista(entrevista: ControlEntrevista, modal) {
    this.entrevista = entrevista;
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  deleteEntrevista(entrevistaId: number) {
    // TODO Implementar si se requiere
  }

  generatePDFEntrevista(entrevistaId: number, modal) {
    this.servicioSocialService.generatePDFEntrevistaTrabajo(entrevistaId).subscribe((data: any) => {
      this.showPreview(data, modal);
    });
  }

  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      console.log(field);

      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
  }

  openModal(modal) {
    this.entrevista = {} as ControlEntrevista;
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
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

  // Table Methods
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

  switch(e) {
    this.p = e;
  }

}

import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-revisiones',
  templateUrl: './revisiones.component.html',
  styleUrls: ['./revisiones.component.scss']
})
export class RevisionesComponent implements OnInit {

  public data = [];
  public isLoading = false;
  public revision: Revision;
  public listImputados = [];
  // Filepreview
  public file: any;
  // Table atributes
  public auxId: any;
  public isForm = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public selectedRow: number;
  public setClickedRow: (i) => void;


  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private seguridadCustodiaService: SeguridadCustodiaService) {

    // Table
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.seguridadCustodiaService.getRevisiones().subscribe((data: any) => {
      console.log('getData', data);
      if (!data.error) {
        this.data = data.revisiones;
        console.log('reviciones', this.data);
      }
    });
  }

  submit(array) {
    if (this.validateFiels(array)) {
      console.log('toServer', this.revision);
      this.seguridadCustodiaService.saveRevision(this.revision).subscribe((data: any) => {
        console.log('submit', data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.getData();
        }
      });
      return this.cancel();
    }
  }

  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
  }

  update(id, item) {
    this.revision = { ...item };
    this.revision.fechaRevision = this.datePipe.transform(this.revision.fechaRevision, 'yyyy-MM-dd');
    // this.revision.fechaRevision = moment(this.revision.fechaRevision).format('yyyy-MM-dd');

    this.isForm = true;

    if (this.auxId && this.auxId !== id) {
      this.showTr();
      this.auxId = id;
    } else {
      this.auxId = id;
    }
    setTimeout(() => {
      this.hiddenTr();
      const tr = document.getElementById(this.auxId);
      const form = document.getElementById('table-form');

      tr.insertAdjacentElement('afterend', form);
    }, 50);
  }

  toggleStatus(id) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.seguridadCustodiaService.changeStatusCapacitaciones(id).subscribe((data: any) => {
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getData();
            }
          });
        });
      }
    })
  }

  seeImputados(item, modal) {
    console.log(item);
    this.listImputados = [];
    this.revision = { ...item };
    this.isLoading = true;
    this.modalService.open(modal, { size: 'sm', windowClass: 'modal-primary' });
    this.seguridadCustodiaService.getImputadosByRevision(item.id).subscribe((data: any) => {
      this.isLoading = false;
      if (!data.error) {
        this.listImputados = data.imputado;
        console.log('list', this.listImputados);
      }
    });
  }

  generatePdf(revisionId, modal) {
    this.isLoading = true;
    this.seguridadCustodiaService.generatePdfRevision(revisionId).subscribe((data: any) => {
      this.isLoading = false;
      this.showPreview(data, modal);
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

  goToPertenencias(item: Revision) {
    localStorage.setItem('revision', JSON.stringify(item));
    this.router.navigate(['dashboard/seguridad-custodia/revisiones-pertenencias']);
  }

  // Table methods
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

  add() {
    this.isForm = true;
    this.revision = {} as Revision;
  }

  cancel() {
    this.showTr();
    this.isForm = false;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  showTr() {
    if (this.auxId) {
      const tr = document.getElementById(this.auxId);
      const array: any = tr.childNodes;

      if (array) {
        for (const td of array) {
          td.style.display = 'table-cell';
        }
        this.auxId = '';
      }
    }
  }

  hiddenTr() {
    const tr = document.getElementById(this.auxId);
    const array: any = tr.childNodes;

    if (array) {
      for (const td of array) {
        td.style.display = 'none';
      }
    }
  }

}
class Revision {
  id: number;
  fechaRevision: any;
  horaRevision: string;
}

import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import { Ingreso } from '@shared/models/Ingreso';
import Swal from 'sweetalert2';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pertenencias',
  templateUrl: './pertenencias.component.html',
  styleUrls: ['./pertenencias.component.scss']
})
export class PertenenciasComponent implements OnInit {

  public isLoading: boolean;
  public ingreso: Ingreso;
  public revisiones = [];
  public revision: any;
  public objetos = [];
  public objeto: any;
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
    private seguridadCustodioService: SeguridadCustodiaService,
    private modalService: NgbModal) {
    this.ingreso = {} as Ingreso;

    // Table
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
  }

  searchImputado() {
    this.isLoading = true;
    this.seguridadCustodioService.getImputadoByFolio(this.ingreso.folio).subscribe((data: any) => {
      this.isLoading = false;
      console.log('data', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.ingreso.imputado = data.imputado;
        this.getData();
      } else {
        this.ingreso = {} as Ingreso;
        this.revisiones = [];
        this.objetos = [];
      }
    });
  }

  getData() {
    this.seguridadCustodioService.getRegistroPertenencias(this.ingreso.imputado.id)
      .subscribe((data: any) => {
        console.log(data);
        this.revisiones = data.imputado.listaRevisiones;
      });
  }

  selectRevision(rev) {
    this.revision = { ...rev };
    this.getObjetosReviciones(this.revision.id);
  }

  getObjetosReviciones(revisionId) {
    this.isLoading = true;
    this.seguridadCustodioService.getObjetosRevision(revisionId).subscribe((data: any) => {
      this.isLoading = false;
      console.log('getObjetosReviciones', data);
      if (!data.error) {
        this.objetos = data.objetosDecomisados;
      } else {
        this.objetos = [];
      }
    });
  }

  saveObjeto(array) {
    if (this.validateFiels(array)) {
      this.objeto.revision = { id: this.revision.id };
      console.log('to Server', this.objeto);
      this.seguridadCustodioService.saveObjetoRevision(this.objeto).subscribe((data: any) => {
        this.cancel();
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.getObjetosReviciones(this.revision.id);
        }
      });
    }
  }

  deleteObjeto(objetoId) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.isLoading = true;
        this.seguridadCustodioService.deleteObjetosRevision(objetoId).subscribe((data: any) => {
          this.isLoading = false;
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getObjetosReviciones(this.revision.id);
            }
          });
        });
      }
    });
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

  openFormModal(modal) {
    this.revision = {};
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  saveRevision() {
    this.isLoading = true;
    this.revision.imputado = { id: this.ingreso.imputado.id }
    this.seguridadCustodioService.saveRegistroPertenencias(this.revision).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.getData();
        this.modalService.dismissAll();
      }
    });
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
    this.objeto = {};
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

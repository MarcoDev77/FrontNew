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
  public isLoadingSearchName: boolean
  public isLoadingSearchFolio: boolean
  public criteria = '';
  public imputadoListSearch = [];
  public imputadoList = [];
  public objetosList = [];
  public revision: any;
  public objetoDecomisado: any;
  public currentImputado: any;
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

    this.revision = JSON.parse(localStorage.getItem('revision'));

    // Table
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.seguridadCustodioService.getImputadosByRevision(this.revision.id).subscribe((data: any) => {
      this.isLoading = false;
      console.log('getData', data);
      if (!data.error) {
        this.imputadoList = data.imputado;
      }
    });
  }

  searchImputado() {
    this.isLoadingSearchFolio = true;
    this.isLoadingSearchName = true;
    this.imputadoListSearch = [];
    this.seguridadCustodioService.filterBusquedaListaIngresos('folio', this.criteria)
      .subscribe((data: any) => {
        this.isLoadingSearchFolio = false;
        if (!data.error) {
          this.imputadoListSearch = [...this.imputadoListSearch, ...data.ingresos];
        }
      });
    this.seguridadCustodioService.filterBusquedaListaIngresos('nombre', this.criteria)
      .subscribe((data: any) => {
        this.isLoadingSearchName = false;
        if (!data.error) {
          this.imputadoListSearch = [...this.imputadoListSearch, ...data.ingresos];
        }
      });
  }

  selectImputado(item) {
    this.currentImputado = { ...item };
    this.objetosList = [];
    this.isLoading = true;
    this.seguridadCustodioService.getObjetosRevision(this.revision.id, item.id)
      .subscribe((data: any) => {
        this.isLoading = false;
        if (!data.error) {
          this.objetosList = data.objetosDecomisados;
        }
      });
  }

  saveObjeto(array) {
    if (this.validateFiels(array)) {
      this.objetoDecomisado.revision = { id: this.revision.id };
      this.objetoDecomisado.imputado = { id: this.currentImputado.id };
      console.log('to Server', this.objetoDecomisado);
      this.seguridadCustodioService.saveObjetoRevision(this.objetoDecomisado).subscribe((data: any) => {
        this.cancel();
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.selectImputado(this.currentImputado);
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
              this.selectImputado(this.currentImputado);
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
    this.objetoDecomisado = {};
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

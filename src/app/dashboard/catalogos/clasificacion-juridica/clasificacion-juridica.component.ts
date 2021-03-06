import { Component, OnInit } from '@angular/core';
import { ClasificacionJuridica } from '@shared/models/ClasificacionJuridica';
import { CatalogosService } from '@shared/services/catalogos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificacion-juridica',
  templateUrl: './clasificacion-juridica.component.html',
  styleUrls: ['./clasificacion-juridica.component.scss']
})
export class ClasificacionJuridicaComponent implements OnInit {
  public isLoading = false;
  public item: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public data: ClasificacionJuridica[];
  public clasificacionJuridica: ClasificacionJuridica
  public roles: any;


  public date;
  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  constructor(private catalogosService: CatalogosService) {

    this.clasificacionJuridica = {} as ClasificacionJuridica;
    this.data = [];
    this.date = new Date();
    this.roles = [];

    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.isLoading = true;
    this.catalogosService.listClasificacionJuridica().subscribe((data: any) => {
      this.isLoading = false;
      if (data.error) {
        alert('Error ' + data.mensaje.toString());
      } else {
        this.data = data.clasificacionesJuridicas;
      }
    });
  }

  submit(array) {
    if (this.validateFiels(array)) {
      this.catalogosService.saveClasificacionJuridica(this.clasificacionJuridica).subscribe((data: any) => {
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.cancel();
          this.getData();
        }
      });
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
  }

  update(id, item) {
    this.isForm = true;
    this.clasificacionJuridica = { ...item };
    // this.areaPericial.role = [{value: item.role, description: item.roleNombre}];

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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.clasificacionJuridica = {} as ClasificacionJuridica;
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

  toggleStatus(item: ClasificacionJuridica) {
    Swal.fire({
      title: '??Estas seguro?',
      text: 'El estatus del registro cambiar??.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'S??',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.catalogosService.changeStatusClasificacionJuridica(item.id).subscribe((data: any) => {
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.cancel();
              this.getData();
            }
          });
        });
      }
    });
  }
}

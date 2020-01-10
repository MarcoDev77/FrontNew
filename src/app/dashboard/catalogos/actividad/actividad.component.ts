import { Component, OnInit } from '@angular/core';
import {TipoActividad} from '@shared/models/TipoActividad';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {CatalogosService} from '@shared/services/catalogos.service';
import {EncrDecrService} from '@shared/helpers/encr-decr.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Actividad} from '@shared/models/Actividad';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {

  public isLoading = false;
  public item: any;
  public selectedRow: number;
  public setClickedRow: Function;
  public data: Actividad[];
  public actividad: Actividad;

  public date;
  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public tipoActividad: TipoActividad;

  constructor(private catalogosService: CatalogosService, private kryptoService: EncrDecrService) {
    this.data = [];
    this.actividad = {} as Actividad;
    this.tipoActividad = JSON.parse(this.kryptoService.get(sessionStorage.getItem('tipoActividad')));

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData(this.tipoActividad.id);
  }

  getData(idCentro) {
    this.isLoading = true;
    this.catalogosService.listActividad(idCentro).subscribe((data: any) => {
      this.isLoading = false;
      console.log('DATA', data);
      if (data.error) {
        alert('Error ' + data.mensaje.toString());
      } else {
        this.data = data.actividades;
      }
    });
  }

  submit(array) {
    if (this.validateFiels(array)) {
      this.actividad.tipoActividad = {
        id: this.tipoActividad.id
      };
      this.catalogosService.saveActividad(this.actividad).subscribe((data: any) => {
        console.log('ADD', data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.cancel();
          this.getData(this.tipoActividad.id);
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
    this.actividad = {...item};

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
    this.actividad = {} as Actividad;
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

  toggleStatus(item: CentroPenitenciario) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.catalogosService.changeStatusActividad(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Actualizado',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getData(this.tipoActividad.id);
            }
          });
        });
      }
    });
  }

}

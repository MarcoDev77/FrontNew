import { Component, OnInit } from '@angular/core';
import { Dormitorio } from '@shared/models/Dormitorio';
import { CentroPenitenciario } from '@shared/models/CentroPenitenciario';
import { CatalogosService } from '@shared/services/catalogos.service';
import { EncrDecrService } from '@shared/helpers/encr-decr.service';
import Swal from 'sweetalert2';
import { TipoActividad } from '@shared/models/TipoActividad';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.scss']
})
export class TipoActividadComponent implements OnInit {

  public isLoading = false;
  public item: any;
  public selectedRow: number;
  public setClickedRow: Function;
  public data: TipoActividad[];
  public tipoActividad: TipoActividad;

  public date;
  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public centroPenitenciario: CentroPenitenciario;

  constructor(private catalogosService: CatalogosService, private kryptoService: EncrDecrService, private router: Router) {
    this.data = [];
    this.tipoActividad = {} as TipoActividad;
    this.centroPenitenciario = JSON.parse(this.kryptoService.get(sessionStorage.getItem('centroPenitenciario')));

    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData(this.centroPenitenciario.id);
  }

  getData(idCentro) {
    this.isLoading = true;
    this.catalogosService.listTipoActividad(idCentro).subscribe((data: any) => {
      this.isLoading = false;
      if (data.error) {
        alert('Error ' + data.mensaje.toString());
      } else {
        this.data = data.tipoActividades;
      }
    });
  }

  submit(array) {
    if (this.validateFiels(array)) {
      this.tipoActividad.centroPenitenciario = {
        id: this.centroPenitenciario.id
      };
      this.catalogosService.saveTipoActividad(this.tipoActividad).subscribe((data: any) => {
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.cancel();
          this.getData(this.centroPenitenciario.id);
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
    this.tipoActividad = { ...item };

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
    this.tipoActividad = {} as TipoActividad;
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
    }).then(({ value }) => {
      if (value) {
        this.catalogosService.changeStatusTipoActividad(item.id).subscribe((data: any) => {
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.getData(this.centroPenitenciario.id);
            }
          });
        });
      }
    });
  }

  seeActividades(item: any) {
    sessionStorage.setItem('tipoActividad', this.kryptoService.set(JSON.stringify(item)));
    this.router.navigate(['/catalogo/centro-penitenciario/tipo-actividad/actividad']);
  }

  goBack() {
    this.router.navigate(['/catalogo/centro-penitenciario']);
  }
}

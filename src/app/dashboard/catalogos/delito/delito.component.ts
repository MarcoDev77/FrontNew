import {Component, Input, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {Delito} from '@shared/models/Delito';
import {CatalogosService} from '@shared/services/catalogos.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delito',
  templateUrl: './delito.component.html',
  styleUrls: ['./delito.component.scss']
})
export class DelitoComponent implements OnInit {

  public isLoading = false;
  public item: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public data: Delito[];
  public delito: Delito;
  public modalidadesDelito: any[];
  public date;
  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  @Input() from;

  constructor(private catalogosService: CatalogosService, private router:Router) {
    this.data = [];
    this.delito = {} as Delito;
    this.modalidadesDelito = [];

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.isLoading = true;
    this.catalogosService.listDelito().subscribe((data: any) => {
      this.isLoading = false;
      console.log('DATA', data);
      if (data.error) {
        alert('Error ' + data.mensaje.toString());
      } else {
        this.data = data.delitos;
      }
    });
  }



  submit(array) {
    if (this.validateFiels(array)) {
      this.catalogosService.saveDelito(this.delito).subscribe((data: any) => {
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
    this.delito = {...item};


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
    this.delito = {} as Delito;
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
        this.catalogosService.deleteDelito(item.id).subscribe((data: any) => {
          console.log(data);
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
    });
  }

  modalidades(delito) {

    sessionStorage.setItem('delito', JSON.stringify(delito));
    this.router.navigate(['/dashboard/catalogo/modalidad-delito']);
  }

}

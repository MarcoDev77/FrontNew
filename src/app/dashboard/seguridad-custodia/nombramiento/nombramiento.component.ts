import { Component, OnInit } from '@angular/core';
import { Nombramiento } from '@shared/models/Nombramiento';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nombramiento',
  templateUrl: './nombramiento.component.html',
  styleUrls: ['./nombramiento.component.scss']
})
export class NombramientoComponent implements OnInit {
  public nombramiento: Nombramiento;
  public nombramientos: any[];
  public isLoading: boolean;


  // Table attributes
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public selectedRow: Number;
  public setClickedRow: (i) => void;
  public auxId: any;
  constructor(private seguridadCustodiaService: SeguridadCustodiaService) {
    this.nombramiento = {} as any;
    this.nombramientos = [];
    this.setClickedRow = (index) => {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.seguridadCustodiaService.listNombramientos().subscribe((data: any) => {
      if (!data.error) {
        this.nombramientos = data.nombramiento
      }
    })
  }

  saveNombramiento(array: any[]) {
    if (this.validateFiels(array)) {
      this.seguridadCustodiaService.saveNombramiento(this.nombramiento).subscribe((data: any) => {
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

  toggleStatus(item: Nombramiento) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({ value }) => {
      if (value) {
        this.seguridadCustodiaService.cambiarStatusNombramiento(item.id).subscribe((data: any) => {
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


  updateNombramiento(id, item) {
    this.isForm = true;
    this.nombramiento = { ...item };

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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.nombramiento = {} as Nombramiento;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  add() {
    this.nombramiento = {} as Nombramiento;
    this.isForm = true;
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

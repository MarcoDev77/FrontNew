import {Component, Input, OnInit} from '@angular/core';
import {Delito} from '@shared/models/Delito';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carpeta-investigacion-imputado',
  templateUrl: './carpeta-investigacion-imputado.component.html',
  styleUrls: ['./carpeta-investigacion-imputado.component.scss']
})
export class CarpetaInvestigacionImputadoComponent implements OnInit {

  @Input() ingresoId;
  public carpeta: any;
  public data = [];
  public ingreso: any;
  @Input() role;

  // Table
  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default
  public isForm: boolean;
  public isLoading: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public auxId: any;

  constructor(private ingresoService: IngresoService, private modalService: NgbModal) {
    this.carpeta = {} as any;
    // Table
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
  }

  ngOnInit() {
    this.getData(this.ingresoId);
  }

  getData(ingresoId) {
    this.ingresoService.listCarpetasInvestigacion(ingresoId).subscribe((data: any) => {
      console.log(data);
      if (!data.error) {
        this.data = data.carpetaInvestigacion;
      }
    });
  }

  // Table Methods
  nombreV: any;
  toggleForm() {
    this.isForm = !this.isForm;
  }

  update(item: any) {
    this.carpeta = {...item};
    this.toggleForm();
  }

  seeDelitosCarpeta(item: any,modal) {
    this.carpeta=item
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  delete(item: any) {
    console.log(item);
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El estatus del registro cambiará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.ingresoService.deleteCarpetaInvestigacion(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          });
          if (!data.error) {
            this.getData(this.ingresoId);
          }
        });
      }
    });
  }

  sort(key: string) {
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
    this.carpeta = {} as any;
  }

  submit(array?) {
    this.carpeta = {...this.carpeta, imputado: {id: this.ingresoId}};
    this.ingresoService.saveCarpetaInvestigacion(this.carpeta).subscribe((data: any) => {
      console.log('save carpeta', data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.cancel();
        this.getData(this.ingresoId);
      }
    });
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  validateFields(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
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

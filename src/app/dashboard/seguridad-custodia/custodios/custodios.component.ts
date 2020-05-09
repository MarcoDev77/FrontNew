import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Custodio } from '@shared/models/Custodio';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import { Nombramiento } from '@shared/models/Nombramiento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custodios',
  templateUrl: './custodios.component.html',
  styleUrls: ['./custodios.component.scss']
})
export class CustodiosComponent implements OnInit {

  public custodios: Custodio[];
  public custodio: Custodio;
  public isLoading: boolean;
  public nombramientos: Nombramiento[];
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
    private modalService: NgbModal,
    private serguridadCustodiaService: SeguridadCustodiaService) {
    this.custodios = [];
  }

  ngOnInit() {
    this.getData();
    this.getNombramientos();
  }

  getData() {
    this.isLoading = true;
    this.serguridadCustodiaService.listCustodios().subscribe((data: any) => {
      console.log('getData', data);
      this.isLoading = false;
      this.custodios = data.custodios;
    });
  }

  submit() {
    this.isLoading = true;
    this.serguridadCustodiaService.saveCustodio(this.custodio).subscribe((data: any) => {
      console.log('submit', data);
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      }).then(() => {
        this.modalService.dismissAll();
        if (!data.error) {
          this.getData();
        }
      });
    });
  }

  update(custodio: Custodio) {

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
        this.serguridadCustodiaService.changeStatusCustodio(id).subscribe((data: any) => {
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

  openModal(modal, config?: any) {
    if (config.isNew) {
      console.log('is New');
      this.custodio = {} as Custodio;
      this.custodio.nombramiento = {};
      this.custodio.formacionInicial = false;
    } else {
      this.custodio = config.custodio;
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  getNombramientos() {
    this.serguridadCustodiaService.listNombramientos().subscribe((data: any) => {
      this.nombramientos = data.nombramiento;
    });
  }

  // Table methods
  switch = e => this.p = e;

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
}

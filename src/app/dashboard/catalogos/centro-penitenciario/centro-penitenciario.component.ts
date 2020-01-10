import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {EncrDecrService} from '@shared/helpers/encr-decr.service';

@Component({
  selector: 'app-centro-penitenciario',
  templateUrl: './centro-penitenciario.component.html',
  styleUrls: ['./centro-penitenciario.component.scss']
})
export class CentroPenitenciarioComponent implements OnInit {
  public isLoading = false;
  public item: any;
  public selectedRow: Number;
  public setClickedRow: Function;
  public data: CentroPenitenciario[];
  public estados: any[];
  public municipios: any[];
  public centroPenitenciario: CentroPenitenciario;

  public auxId: any;
  public isForm = false;

  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  constructor(
    private catalogosService: CatalogosService,
    private modalService: NgbModal,
    private router: Router,
    private kryptoService: EncrDecrService,
  ) {
    this.centroPenitenciario = {} as CentroPenitenciario;
    this.data = [];
    this.estados = [];
    this.municipios = [];

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    const logged = localStorage.getItem('logged');
    if (!logged) {
      location.reload();
      localStorage.setItem('logged', 'logged');
    }
    this.getData();
    this.getEstados('mexico', null);
    // this.getMunicipios('morelos', null);
  }

  delte(item) {
    if (confirm('Eliminar?')) {
      this.catalogosService.deleteCentroPenitenciario(item.id).subscribe((data: any) => {
        console.log(data);
        if (!data.error) {
          this.getData();
        } else {
          alert('Error ' + data.mensaje.toString());
          // swal(
          //   'Error!',
          //   data.mensaje,
          //   'error'
          // );
        }
      });
    } else {
      console.log('saved');
    }
  }

  getData() {
    this.isLoading = true;
    this.catalogosService.listCentroPenitenciario().subscribe((data: any) => {
      this.isLoading = false;
      console.log('DATA', data);
      if (data.error) {
        alert('Error ' + data.mensaje.toString());
      } else {
        this.data = data.centros;
      }
    });
  }

  getEstados(region, idPais) {
    this.catalogosService.listEstados(region, idPais).subscribe((data: any) => {
      if (data.estados) {
        for (const estado of data.estados) {
          this.estados = [...this.estados, {value: estado.id, description: estado.nombre}];
        }
        console.log('ESTADOS', this.estados);
      }
    });
  }

  getMunicipios(region, idEstado) {
    console.log(region, idEstado);
    this.catalogosService.listMunicipios(region, idEstado).subscribe((data: any) => {
      console.log('Municipios', data);
      if (data.estados) {
        for (const municipio of data.estados) {
          this.municipios = [...this.municipios, {value: municipio.id, description: municipio.nombre}];
        }
        console.log('Municipios', this.municipios);
      }
    });
  }

  submit(array?) {
    console.log('submit', this.centroPenitenciario);
    this.catalogosService.saveCentroPenitenciario(this.centroPenitenciario).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      }).finally(() => {
        if (!data.error) {
          this.getData();
          this.modalService.dismissAll();
        }
      });
    });
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

  add(modal) {
    this.centroPenitenciario = {} as CentroPenitenciario;
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }

  update(item, modal) {
    console.log(item);
    this.centroPenitenciario = {...item};
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
    this.centroPenitenciario.estadoSelect = [{value: item.municipio.estado.id, description: item.municipio.estado.nombre}];
    this.centroPenitenciario.municipioSelect = [{value: item.municipio.id, description: item.municipio.nombre}];
  }

  switch(e) {
    this.p = e;
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
        this.catalogosService.deleteCentroPenitenciario(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Actualizado',
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

  onSelectEstado() {
    if (this.centroPenitenciario) {
      const estado = this.centroPenitenciario.estadoSelect;
      console.log('isEstado', estado);
      this.getMunicipios('seleccionada', estado.value);
    }
  }

  seeDormitorios(item: CentroPenitenciario) {
    sessionStorage.setItem('centroPenitenciario', this.kryptoService.set(JSON.stringify(item)));
    this.router.navigate(['/catalogo/centro-penitenciario/dormitorio']);
  }

  seeActividades(item: CentroPenitenciario) {
    sessionStorage.setItem('centroPenitenciario', this.kryptoService.set(JSON.stringify(item)));
    this.router.navigate(['/catalogo/centro-penitenciario/tipo-actividad']);
  }
}

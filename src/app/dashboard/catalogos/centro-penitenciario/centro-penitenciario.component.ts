import {Component, OnInit} from '@angular/core';
import {CatalogosService} from '@shared/services/catalogos.service';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {EncrDecrService} from '@shared/helpers/encr-decr.service';
import {Personal} from '@shared/models/Personal';
import {User} from '@shared/models/User';

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
  public tipoCentros: any[];
  public listAreas: any[] = [];
  public centroPenitenciario: CentroPenitenciario;
  public persona: Personal;
  public user: User;

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
    this.tipoCentros = [];
    this.user = {} as User;
    this.persona = {} as Personal;

    this.setClickedRow = (index) => {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
    this.getData();
    this.getEstados('mexico', null);
    this.getTipoCentros();
    this.getAreas();
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

  getTipoCentros() {
    this.catalogosService.listTipoCentro().subscribe((data: any) => {
      if (data.tipoCentros) {
        for (const tipo of data.tipoCentros) {
          this.tipoCentros = [...this.tipoCentros, {value: tipo.id, description: tipo.nombre}];
        }
        console.log('TIPO CENTROS', this.tipoCentros);
      }
    });
  }

  getEstados(region, idPais) {
    this.catalogosService.listEstados(region, idPais).subscribe((data: any) => {
      if (data.estados) {
        this.estados = [];
        for (const estado of data.estados) {
          this.estados = [...this.estados, {value: estado.id, description: estado.nombre}];
        }
        this.estados = [...this.estados].sort();
        console.log('ESTADOS', this.estados);
      }
    });
  }

  getMunicipios(region, idEstado) {
    console.log(region, idEstado);
    this.catalogosService.listMunicipios(region, idEstado).subscribe((data: any) => {
      console.log('Municipios', data);
      if (data.estados) {
        this.municipios = [];
        for (const municipio of data.estados) {
          this.municipios = [...this.municipios, {value: municipio.id, description: municipio.nombre}];
        }
        console.log('Municipios', this.municipios);
      }
    });
  }

  getAreas() {
    this.catalogosService.listAreas().subscribe((data: any) => {
      console.log('Areas', data);
      for (const area of data.areas) {
        this.listAreas = [...this.listAreas, {value: area.id, description: area.nombre}];
      }
    });
  }

  submit(array?) {
    if (!this.centroPenitenciario.municipioSelect || !this.centroPenitenciario.tipoCentroSelect) {
      return Swal.fire('Atención', 'Tienes que selecionar estado, municipio y tipo de centro.', 'warning');
    }
    if (!this.persona.areaSelect) {
      return Swal.fire('Atención', 'Tienes que selecionar el area del administrador.', 'warning');
    }
    // this.catalogosService.validAdminCentroPenitenciario({}).subscribe((res: any) => {
    //   console.log(res);
    // });
    // return console.log('submit', this.centroPenitenciario, 'personal', this.persona, 'user', this.user);
    const model = {
      ...this.centroPenitenciario,
      personal: {...this.persona, ...this.user},
    };
    console.log('Model', model);
    this.catalogosService.saveCentroPenitenciario(model).subscribe((data: any) => {
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
    this.persona = {} as Personal;
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }

  update(item, modal) {
    console.log(item);
    this.centroPenitenciario = {...item};
    this.persona = {...item.personal};
    this.user.username = item.personal.username;
    this.user.password = item.personal.password;
    this.centroPenitenciario.estadoSelect = [{value: item.municipio.estado.id, description: item.municipio.estado.nombre}];
    this.centroPenitenciario.municipioSelect = [{value: item.municipio.id, description: item.municipio.nombre}];
    this.centroPenitenciario.tipoCentroSelect = [{value: item.tipoCentro.id, description: item.tipoCentro.nombre}];
    this.persona.areaSelect = [{value: item.personal.area.id , description: item.personal.area.nombre}];
    this.modalService.open(modal, {size: 'lg', windowClass: 'modal-primary mt-12'});
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

  onSelectEstado() {
    if (this.centroPenitenciario && this.centroPenitenciario.estadoSelect) {
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

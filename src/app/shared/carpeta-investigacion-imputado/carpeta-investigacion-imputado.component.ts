import {Component, Input, OnInit} from '@angular/core';
import {Delito} from '@shared/models/Delito';
import {IngresoService} from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import {roles} from '@shared/helpers/roles';
import {map} from 'rxjs/operators';
import { CatalogosService } from '@shared/services/catalogos.service';

@Component({
  selector: 'app-carpeta-investigacion-imputado',
  templateUrl: './carpeta-investigacion-imputado.component.html',
  styleUrls: ['./carpeta-investigacion-imputado.component.scss']
})
export class CarpetaInvestigacionImputadoComponent implements OnInit {

  @Input() ingresoId;
  @Input() personaId;
  public carpeta: any;
  public data = [];
  public delitosData = [];
  public ingreso: any;
  @Input() role;
  public nombreV: any;
  public ROLE_ARCHIVO = roles.archivo.role;


  public delito: any
  public tipoDelitoLista: any[];
  public delitoUpdate:any

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

  constructor(private ingresoService: IngresoService, private modalService: NgbModal,private catalogosService: CatalogosService) {
    this.carpeta = {} as any;
    this.delito = {} as any;
    this.delitoUpdate = {} as any;

    // Table
    this.getTipoDelitos();

    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ingresoService.listCarpetasInvestigacion(this.personaId).subscribe((data: any) => {

      console.log(data);
      if (!data.error) {
        console.log(data)
        this.data = data.listaCarpeta;
      }
    });
  }

  // Table Methods
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
    this.getDelitos()

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
            this.getData();
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
    this.carpeta = {...this.carpeta, imputado: {id: this.ingresoId}, personaIngresada: { id: this.personaId}};
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
        this.getData();
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

  //Delitos

  search = (text$: Observable<string>) =>{
    return text$.pipe(
      map(term => term === '' ? []
        : this.tipoDelitoLista.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  }
  formatter = (x: {nombre: string}) => x.nombre;

  closeModal(){
    this.modalService.dismissAll()
  }

  getTipoDelitos() {
    this.catalogosService.listDelito().subscribe((data: any) => {
      this.tipoDelitoLista=data.delitos
    })
  }


  saveDelito() {
     console.log("save",this.delito)
    
    if (this.delito.idTipoDelito==null) {
      console.log("null")
      let tipoDelito={
        nombre: this.delito
      }
      let delitoNuevo={
        nombre: this.delito,
        tipoDelito: tipoDelito
      }
      this.delito=delitoNuevo;
    } else {
      console.log("else");
      
      this.delito.tipoDelito = {
        id: this.delito.idTipoDelito
      }
      this.delito.id=this.delitoUpdate.id
    }
    this.delito.carpetaInvestigacion = {
      id: this.carpeta.id
    }

       console.log("almost save",this.delito)
      this.ingresoService.saveDelito(this.delito).subscribe((data: any) => {
        console.log(data)

        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        this.delito={}
        this.delitoUpdate={}
      this.getDelitos()
       this.getData()
      })

  }

  getDelitos() {
    this.ingresoService.listDelitosByCarpetaInvestigacion(this.carpeta.id).subscribe((data: any) => {
      if (data.listaDelitos) {
        this.delitosData = data.listaDelitos
      }
    })

    }

    delitoEdit(delito) {
      
      this.delito.id = delito.id
      this.delito = delito
      this.delito.nombre=delito.tipoDelito.nombre
      this.delito.juez = delito.juez;
      this.delitoUpdate=delito
      console.log(this.delito)
    }


}

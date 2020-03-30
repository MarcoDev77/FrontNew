import { Component, OnInit, Input } from '@angular/core';
import { CatalogosService } from '@shared/services/catalogos.service';
import { IngresoService } from '@shared/services/ingreso.service';
import { AuthenticationService } from '@shared/services/authentication.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-delito-ingreso',
  templateUrl: './delito-ingreso.component.html',
  styleUrls: ['./delito-ingreso.component.scss']
})
export class DelitoIngresoComponent implements OnInit {
  public delito: any;
  public isForm: boolean;
  public isRecord: boolean = false;
  public data: any;
  public tipoDelitoLista: any[];
  public tipoDelitoSelected: any;
  public delitoAdicional: boolean
  public role: boolean = false;
  public user: any 
  public hitorialDelitos = [];
  @Input() carpetaInvestigacionId?: number;
  @Input() causaPenalId?: number;
  @Input() personaId?:number
  @Input() refresh:(id?)=> void;

  constructor(private catalogosService: CatalogosService, private ingresoService: IngresoService, private authenticationService: AuthenticationService,
    private modalService: NgbModal) {

    this.data = [];
    this.tipoDelitoLista = [];
    this.isForm = true;
    this.delitoAdicional = false
    this.delito = {} as any;

  }

  ngOnInit() {
    this.getTipoDelitos();
    this.getDelitos();
    this.user = this.authenticationService.getCurrentUser();
    console.log("carpeta",this.carpetaInvestigacionId)
    console.log("causa",this.causaPenalId)
  }
  toggleForm(flag: boolean) {

    if (this.user.roles.includes('ROLE_ARCHIVO') || this.user.roles.includes('ROLE_SUPERADMINISTRADOR')) {
      this.role = true;
    }
    this.isForm = flag;
  }
  //Obtiene los delitos relacionados al imputado por causa penal o por carpeta de investigación
  getDelitos() {

    if (this.carpetaInvestigacionId != undefined) {
      this.ingresoService.listDelitosByCarpetaInvestigacion(this.carpetaInvestigacionId).subscribe((data: any) => {
      
        if (data.listaDelitos) {
          this.data = data.listaDelitos
        }

      })

    } else {
      this.ingresoService.listDelitosByCausasPenales(this.causaPenalId).subscribe((data: any) => {
      
        if (data.listaDelitos) {
          this.data = data.listaDelitos
        }
      })
    }

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
    }

    if (this.carpetaInvestigacionId != undefined) {
      this.delito.carpetaInvestigacion = {
        id: this.carpetaInvestigacionId
      }
    } else {
      this.delito.causaPenal = {
        id: this.causaPenalId
      }
    }
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
      
        this.getDelitos();
        this.refresh(this.personaId)
      })

  }

  getHistorial(delitoId) {

  }

  delitoEdit(delito) {
    this.delito.id = delito.id
    this.tipoDelitoSelected = { value: delito.tipoDelito.id, description: delito.tipoDelito.nombre }
    this.delito.juez = delito.juez;
    console.log(delito)
  }

  viewHistory(item) {
    console.log(item);
    this.isRecord = true;
    this.ingresoService.getHistorialDelito(item.id).subscribe((data: any) => {
      console.log(data);
      if (!data.error) {
        this.hitorialDelitos = data.historicoDelitos.map(delito => {
          return ({
            ...delito,
            informacionNueva: JSON.parse(delito.informacionNueva),
          });
        });
        console.log(this.hitorialDelitos);
      }
    });
  }

  switch($event: number) {

  }

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
}

class Delito {
  public id?: number;
  public nombre?: String;
  public juez?: String;
  public tipoId?: String; 
  public carpetaInvestigacion?: any;
  public causaPenal?: any;
  public otro?: boolean;
  public tipoDelito?: any;
  public delitoAdicional?: string;
  public idTipoDelito?:any
}


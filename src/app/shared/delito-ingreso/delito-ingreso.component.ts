import { Component, OnInit, Input } from '@angular/core';
import { CatalogosService } from '@shared/services/catalogos.service';
import { IngresoService } from '@shared/services/ingreso.service';
import { AuthenticationService } from '@shared/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delito-ingreso',
  templateUrl: './delito-ingreso.component.html',
  styleUrls: ['./delito-ingreso.component.scss']
})
export class DelitoIngresoComponent implements OnInit {
  public delito: Delito;
  public isForm: boolean;
  public data: any;
  public tipoDelitoLista: any[];
  public tipoDelitoSelected: any;
  public delitoAdicional: boolean
  public role: boolean=false;
  public user:any
  @Input() carpetaInvestigacionId?:number;
  @Input() causaPenalId?: number;

  constructor(private catalogosService: CatalogosService,private ingresoService: IngresoService, private authenticationService: AuthenticationService) { 

    this.data= [];
    this.tipoDelitoLista= [];
    this.isForm=false;
    this.delitoAdicional= false
    this.delito= {} as any;
  }

  ngOnInit() {
    this.getTipoDelitos();
    this.getDelitos();
   this.user = this.authenticationService.getCurrentUser();
   
  }
  toggleForm(flag : boolean){
   
    if (this.user.roles.includes('ROLE_ARCHIVO') || this.user.roles.includes('ROLE_SUPERADMINISTRADOR')){
      this.role=true;
    }
    this.isForm=flag;
  }
  //Obtiene los delitos relacionados al imputado por causa penal o por carpeta de investigación
  getDelitos(){

    if(this.carpetaInvestigacionId!=undefined){
      this.ingresoService.listDelitosByCarpetaInvestigacion(this.carpetaInvestigacionId).subscribe((data:any)=>{
          console.log("getInvestigacion",data)
          if(data.listaDelitos){
            this.data=data.listaDelitos
          }
         
      })

    }else{
      this.ingresoService.listDelitosByCausasPenales(this.causaPenalId).subscribe((data:any)=>{
        console.log("getCausas",data)
        if(data.listaDelitos){
        this.data=data.listaDelitos
        }
    })
    }
    
  }

  
  getTipoDelitos(){
      this.catalogosService.listDelito().subscribe((data: any)=>{
        this.tipoDelitoLista=[];
        data.delitos.forEach(delito => {
          this.tipoDelitoLista.push({value: delito.id, description: delito.nombre})
        });
      
      })
  }

  saveDelito(){
    if(this.delito.otro){
      this.delito.tipoDelito={
        nombre: this.delito.delitoAdicional
      }
    }else{
      this.delito.tipoDelito={
        id: this.tipoDelitoSelected.value
      }
    }

    if(this.carpetaInvestigacionId!=undefined){
      this.delito.carpetaInvestigacion={
        id:this.carpetaInvestigacionId
      }
    }else{
      this.delito.causaPenal={
        id:this.causaPenalId
      }

      this.ingresoService.saveDelito(this.delito).subscribe((data:any)=>{
        console.log(data)

        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        this.toggleForm(false);
        this.getDelitos();
      })
    }
  }

  getHistorial(delitoId){
    
  }

  delitoEdit(delito){
    this.delito.id=delito.id
    this.tipoDelitoSelected={value: delito.tipoDelito.id, description: delito.tipoDelito.nombre}
    this.delito.juez=delito.juez;
    console.log(delito)
  }
}

class Delito {
  public id?: number;
  public nombre: String;
  public juez: String;
  public tipoId: String;4
  public carpetaInvestigacion: any;
  public causaPenal:any;
  public otro: boolean;
  public tipoDelito: any;
  public delitoAdicional: string;
}


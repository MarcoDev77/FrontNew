import { Component, OnInit, Input } from '@angular/core';
import { CatalogosService } from '@shared/services/catalogos.service';


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
  @Input() carpetaInvestigacionId?:number;
  @Input() causaPenalId?: number;
  constructor(private catalogosService: CatalogosService) { 

    this.data= [];
    this.tipoDelitoLista= [];
    this.isForm=false;
    this.delitoAdicional= false
    this.delito= {} as any;
  }

  ngOnInit() {
    this.getTipDelitos();
    console.log(this.causaPenalId);
  }
  toggleForm(flag : boolean){
    this.isForm=flag;
  }
  //Obtiene los delitos relacionados al imputado por causa penal o por carpeta de investigación
  getDelitosImputado(){

  }

  
  getTipDelitos(){
      this.catalogosService.listDelito().subscribe((data: any)=>{
        this.tipoDelitoLista=[];
        data.delitos.forEach(delito => {
          this.tipoDelitoLista.push({value: delito.id, description: delito.nombre})
        });
        console.log(this.tipoDelitoLista)
      })
  }

  saveDelito(){
    
  }

  
  getHistorial(delitoId){
    
  }

  delitoEdit(delito){

  }
}

class Delito {
  public id?: number;
  public nombre: String;
  public juez: String;
  public tipoId: String;
}


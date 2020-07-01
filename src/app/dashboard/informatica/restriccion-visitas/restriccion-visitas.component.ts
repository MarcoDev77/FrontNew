import { Component, OnInit } from '@angular/core';
import { InformaticaService } from '@shared/services/informatica.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restriccion-visitas',
  templateUrl: './restriccion-visitas.component.html',
  styleUrls: ['./restriccion-visitas.component.scss']
})
export class RestriccionVisitasComponent implements OnInit {
  public data: []
  public dataPPL: []
  public isLoading: boolean
  public restriccion: Restriccion
  public criteria: any
  public criteriaPPL: any
  public p: any
  public tipo:String
  public persona:any 
  constructor(private InformaticaService: InformaticaService, private modalService: NgbModal) {
    this.criteria = {} as any
    this.criteriaPPL = {} as any
    this.persona= {}as any
    this.restriccion={} as any
    this.data = []
    this.dataPPL = []
    this.isLoading = false
  }

  ngOnInit() {
  }

  searchReferencia(tipo) {
    let model
    if (tipo == 'ppl') {
      this.criteriaPPL.tipoBusqueda= tipo
      model = this.criteriaPPL
    } else {
      this.criteria.tipoBusqueda=tipo
      model= this.criteria
    }
    console.log(model)
    this.InformaticaService.searchReferenciaPersonal(model).subscribe((data: any) => {
      console.log(data)
      if (data.referenciasPersonales && tipo == "referencia") {
        this.data = data.referenciasPersonales
      }
      if (data.registros && tipo == "ppl") {
        this.dataPPL = data.registros
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda terminada!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.resetForm()
    })

  }

  searchImputado(item) {

  }

  saveRestriccion() {
    if(this.tipo=="imputado"){
      this.restriccion.imputado={
        id: this.persona.id
      }
    }else{
      this.restriccion.referenciaPersonal={
        id: this.persona.id
      }
    }
    this.restriccion.tipo=this.tipo
    console.log(this.restriccion)
    this.InformaticaService.saveRestriccion(this.restriccion).subscribe((data: any)=>{
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.resetForm()
    })

  }

  openModal(modal,tipo,item) {
    this.tipo=tipo
    this.persona=item
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  resetForm(){
    this.restriccion={}as any
    this.tipo=''
    this.persona={} as any
    this.criteria={} as any
    this.criteriaPPL={} as any
  }
}

class Restriccion {
  fechaInicio: any
  fechaFin: any
  comentario: String
  imputado?: any
  referenciaPersonal?: any
  tipo?:String
}
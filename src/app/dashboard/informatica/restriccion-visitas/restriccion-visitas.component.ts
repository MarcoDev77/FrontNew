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
  public tipo: String
  public persona: any
  constructor(private InformaticaService: InformaticaService, private modalService: NgbModal) {
    this.criteria = {} as any
    this.criteriaPPL = {} as any
    this.persona = {} as any
    this.restriccion = {} as any
    this.data = []
    this.dataPPL = []
    this.isLoading = false
  }

  ngOnInit() {
  }

  searchReferencia(tipo, showModal) {
    this.data = []
    this.dataPPL = []
    let model
    if (tipo == 'ppl') {
      this.criteriaPPL.tipoBusqueda = tipo
      model = this.criteriaPPL
    } else {
      this.criteria.tipoBusqueda = tipo
      model = this.criteria
    }
    this.InformaticaService.searchReferenciaPersonal(model).subscribe((data: any) => {
      if (data.referenciasPersonales && tipo == "referencia") {
        this.data = data.referenciasPersonales
      }
      if (data.registros && tipo == "ppl") {
        this.dataPPL = data.registros
      }
      if (showModal) {
        Swal.fire({
          title: data.error ? 'Error!' : 'Busqueda terminada!',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
      }
    })

  }

  saveRestriccion() {
    if (this.tipo == "imputado") {
      this.restriccion.imputado = {
        id: this.persona.id
      }
    } else {
      this.restriccion.referenciaPersonal = {
        id: this.persona.id
      }
    }
    this.restriccion.tipo = this.tipo;
    this.InformaticaService.saveRestriccion(this.restriccion).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.reloadData()
      this.modalService.dismissAll()

    })

  }

  deleteRestriccion(item, tipo) {
    this.tipo = tipo
    this.InformaticaService.deleteRestriccion(item.restriccionVisita.id, tipo).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda terminada!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.reloadData()
    })
  }
  reloadData() {
    if (this.tipo === "imputado") {
      this.searchReferencia('ppl', false)
    } else {
      this.searchReferencia('referencia', false)
    }
  }
  openModal(modal, tipo, item) {
    this.tipo = tipo
    this.persona = item
    if (item.restriccionVisita) {
      this.restriccion = item.restriccionVisita
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  resetForm() {
    this.restriccion = {} as any
    this.tipo = ''
    this.persona = {} as any
    this.criteria = {} as any
    this.criteriaPPL = {} as any
  }
}

class Restriccion {
  fechaInicio: any
  fechaFin: any
  comentario: String
  imputado?: any
  referenciaPersonal?: any
  tipo?: String
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pertenencias-resultado-busqueda',
  templateUrl: './pertenencias-resultado-busqueda.component.html',
  styleUrls: ['./pertenencias-resultado-busqueda.component.scss']
})
export class PertenenciasResultadoBusquedaComponent implements OnInit {

  @Input() imputados = [];
  @Input() revisionId: number;
  @Output() refresh = new EventEmitter();
  public auxId: any;
  public isForm = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  constructor(private seguridadCustodioService: SeguridadCustodiaService) { }

  ngOnInit() {
  }

  addImputado(item) {
    const model = {
      imputado: { id: item.id },
      revision: { id: this.revisionId },
    };
    this.seguridadCustodioService.saveImputadoOnRevision(model).subscribe((data: any) => {
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.refresh.emit();
      }
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

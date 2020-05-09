import { Component, OnInit } from '@angular/core';
import { Capacitacion } from '@shared/models/Capacitacion';
import { Router } from '@angular/router';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import { Custodio } from '@shared/models/Custodio';

@Component({
  selector: 'app-capacitaciones-pase-lista',
  templateUrl: './capacitaciones-pase-lista.component.html',
  styleUrls: ['./capacitaciones-pase-lista.component.scss']
})
export class CapacitacionesPaseListaComponent implements OnInit {

  public capacitacion: Capacitacion;
  public isLoading: boolean;
  public custodios: Custodio[];

  constructor(
    private router: Router,
    private seguridadCustodioService: SeguridadCustodiaService) {
    this.capacitacion = JSON.parse(localStorage.getItem('capacitacion'));
    if (!this.capacitacion) {
      this.router.navigate(['dashboard/seguridad-custodia/capacitaciones']);
    }
  }

  ngOnInit() {
    this.getCustodios();
  }

  getCustodios() {
    this.isLoading = true;
    this.seguridadCustodioService.listCustodios().subscribe((data: any) => {
      this.isLoading = false;
      console.log('getCustodios', data);
      this.custodios = data.custodios.filter(c => c.estatus);
    });
  }

  saveAsistencia(custodio: Custodio) {

    const model = {
      custodio: {
        id: custodio.id,
      },
      capacitacion: {
        id: this.capacitacion.id,
      },
    };
    console.log(model);

    this.seguridadCustodioService.saveAsistencia(model).subscribe((data: any) => {
      console.log('saveAsistencia', data);
    });
  }

}

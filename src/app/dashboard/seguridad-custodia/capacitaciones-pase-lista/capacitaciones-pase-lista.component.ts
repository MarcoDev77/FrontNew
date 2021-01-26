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
  public asistencias: any[];
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
      this.custodios = data.custodios.filter(c => c.estatus);
    },
      error => { },
      () => this.getAsistencias()
    );
  }

  getAsistencias() {
    this.seguridadCustodioService.getAsistencias(this.capacitacion.id).subscribe((data: any) => {
      const asistencias = data.capacitaciones;
      this.custodios.map(cus => {
        const asist = asistencias.find(a => a.id === cus.id);
        cus.asistio = asist;
        return cus;
      });
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
    this.seguridadCustodioService.saveAsistencia(model).subscribe((data: any) => {
      if (!data.error) {
        this.getCustodios();
      }
    });
  }

}

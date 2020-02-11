import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '@shared/models/Ingreso';
import { Router } from '@angular/router';
import { IngresoService } from '@shared/services/ingreso.service';
@Component({
  selector: 'app-situacion-juridica-imputado',
  templateUrl: './situacion-juridica-imputado.component.html',
  styleUrls: ['./situacion-juridica-imputado.component.scss']
})
export class SituacionJuridicaImputadoComponent implements OnInit {
  public ingreso: Ingreso;
  constructor(private router: Router, private modalService: NgbModal, private ingresoService: IngresoService) {
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));

  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.ingresoService.getSituacionJuridica(this.ingreso.id).subscribe((data: any) => {
      this.ingreso=data.ingreso;
    })
  }

  viewHistory(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }

  delitoEdit(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary' });
  }
  goTo(uri: string, ingreso: Ingreso) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  add() {

  }

  switch($event: number) {
    
  }
}

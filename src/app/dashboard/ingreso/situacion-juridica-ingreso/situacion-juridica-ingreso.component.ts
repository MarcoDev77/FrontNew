import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ingreso } from '@shared/models/Ingreso';
import { Router } from '@angular/router';
import { IngresoService } from '@shared/services/ingreso.service';
@Component({
  selector: 'app-situacion-penal',
  templateUrl: './situacion-juridica-ingreso.component.html',
  styleUrls: ['./situacion-juridica-ingreso.component.scss']
})
export class SituacionJuridicaIngresoComponent implements OnInit {
  public ingreso:Ingreso
  constructor(private router: Router,private modalService: NgbModal, private ingresoService: IngresoService) {
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    console.log(this.ingreso)
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.ingresoService.getSituacionJuridica(this.ingreso.id).subscribe((data: any) => {
      this.ingreso=data.ingreso;
     console.log(this.ingreso)
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
}

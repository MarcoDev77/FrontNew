import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-causa-penal-ingreso',
  templateUrl: './causa-penal-ingreso.component.html',
  styleUrls: ['./causa-penal-ingreso.component.scss']
})
export class CausaPenalIngresoComponent implements OnInit {
  @ViewChild('modalCausaPenal', {static: false}) public modalCausaPenal: NgbModal;
  @Input() imputadoId?: number;
  @Input() carpetaInvestigacionId?: number;
  @Input() causaPenalId?: number;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
 
  public openModal(){
    this.modalService.open(this.modalCausaPenal, {size: 'lg', windowClass: 'modal-primary mt-12'});
  }

  getData(){
    
  }


}

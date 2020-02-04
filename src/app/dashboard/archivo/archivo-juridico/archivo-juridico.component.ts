import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-archivo-juridico',
  templateUrl: './archivo-juridico.component.html',
  styleUrls: ['./archivo-juridico.component.scss']
})
export class ArchivoJuridicoComponent implements OnInit {

  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModal(conf){
    this.modalService.open(conf,{ size: 'lg', windowClass: 'modal-primary mt-12' });
  }

}

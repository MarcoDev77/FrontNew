import { Component, OnInit } from '@angular/core';
import { Personal } from '@shared/models/Personal';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public data: Personal[];
  public isLoading = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  public selectedRow: number;
  public setClickedRow: Function;

  public roles: any[];
  public rolSelected: any

  constructor(private catalogosService : CatalogosService, private router : Router, private modalService: NgbModal) { 
    this.data = [];
    this.roles=[];
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  ngOnInit() {
   // this.getData();
    this.listRoles();
  }

  getData() {
    this.catalogosService.listUsuarios().subscribe((data: any) => {
      console.log('getData', data);
      this.data = data.ingresos;
    });
  }

  switch(e) {
    this.p = e;
  }

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

  add() {
    

  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'xl', windowClass: 'modal-primary mt-12' });
  }

  goTo(uri: string) {
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  listRoles(){
    this.catalogosService.listRoles().subscribe((data:any)=>{
      console.log(data)
      this.roles=data.roles;
    });
  }

}

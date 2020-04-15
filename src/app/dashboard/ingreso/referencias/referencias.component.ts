import { Component, OnInit } from '@angular/core';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IngresoService } from '@shared/services/ingreso.service';
import { Ingreso } from '@shared/models/Ingreso';
import { Referencia } from '@shared/models/Referencia';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss']
})
export class ReferenciasComponent implements OnInit {
  public referencia: Referencia
  public ingreso: Ingreso
  public data: any;
  public isLoading: boolean
  public paises: any
  public arrayToFilter: any
  public estados: any
  public parentescos: any[]
  constructor( private catalogosService: CatalogosService,
    private router: Router,
    private modalService: NgbModal,
    private ingresoService: IngresoService,) {
      this.isLoading=false;
      this.ingreso = {} as Ingreso;
      this.paises=[];
      this.estados=[];
      this.arrayToFilter=[];
      this.data=[];
      this.referencia= {} as any;
      this.parentescos=[];
      this.referencia.parentesco={} as any;
      this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));

      if (this.ingreso) {
        this.listReferencias(this.ingreso.id);
      }
    }

  ngOnInit() {
  console.log("ingreso", this.ingreso)
  this.catalogosService.listPaises()
  .subscribe((data: any) => this.paises =data.paises);
  this.getEstado();
  this.getParentescos()
  }


  getEstado() {
    this.catalogosService.listEstados('mexico', null)
      .subscribe((data: any) => {
        this.estados = data.estados;
      });
  }

  listReferencias(id){
    this.ingresoService.listRefencias(id).subscribe((data:any)=>{
        this.data=data.referenciasPersonales;
    })
  }

  saveReferencia(){

    this.referencia.imputado={
      id:this.ingreso.id
    }
    console.log("referencia",this.referencia)
    this.ingresoService.saveReferencia(this.referencia).subscribe((data:any)=>{
      if(!data.error){
        this.referencia={} as any;
        this.listReferencias(this.ingreso.id);
        this.modalService.dismissAll()
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });

    })
  }

  deleteReferencia(id){
    this.ingresoService.deleteReferencia(id).subscribe((data:any)=>{
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });

      this.listReferencias(this.ingreso.id);
    })
  }
  showModal(modal, item?) {
    if(item){
      this.referencia=item
      console.log(this.referencia)
    }
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  selectArrayTofilter(array){
    this.arrayToFilter=array;
    console.log(this.arrayToFilter)
  }
  search = (text$: Observable<string>) =>{
    return text$.pipe(
      map(term => term === '' ? []
        : this.arrayToFilter.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  }
  formatter = (x: {nombre: string}) => x.nombre;

  switch($event){

  }

  getParentescos(){
    this.ingresoService.getParentescos().subscribe((data:any)=>{
      this.parentescos=data.parentescos;
      console.log(this.parentescos)
    })
  }

  generatePaseUnico(item: any) {
    console.log('item', item);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingreso } from '@shared/models/Ingreso';
import { IngresoService } from '@shared/services/ingreso.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-lista-ingreso',
  templateUrl: './lista-ingreso.component.html',
  styleUrls: ['./lista-ingreso.component.scss']
})
export class ListaIngresoComponent implements OnInit {

  public data: Ingreso[];
  public isLoading = false;
  public filterSearch = '';
  public criteria = '';
  public roles = []
  // Table attributes
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;
  public itemsPerPage = 10;

  // FilePreview
  public file: any;

  public selectedRow: number;
  public setClickedRow: Function;
  constructor(private router: Router, private ingresoService: IngresoService, private modalService: NgbModal, private authenticationService: AuthenticationService) {
    this.data = [];
    const user = this.authenticationService.getCurrentUser()
    this.roles = user.roles;
    this.setClickedRow = function (index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };
  }

  // selectFilterSearch(filterName) {
  //   // Si filterName esta vacio se limpian las variables de busqueda (filterSearch y criteria)
  //   // y se hace la peticion getData
  //   if (!filterName) {
  //     this.filterSearch = '';
  //     this.criteria = '';
  //     this.getData();
  //   } else {
  //     this.filterSearch = filterName;
  //     // Si filterSearch es imputado o ingreso se hace la busqueda al instante
  //     if (this.filterSearch === 'ingreso' || this.filterSearch === 'imputado') {
  //       this.getDataWithFilter();
  //     }
  //   }
  //   this.modalService.dismissAll();
  // }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ingresoService.listIngreso('listaTotal').subscribe((data: any) => {
      console.log("data->", data);
      this.data = data.ingresos;
    });
  }

  getDataWithFilter() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.ingresoService.filterBusquedaListaIngresos(this.criteria).subscribe((data: any) => {
      this.isLoading = false;
      Swal.fire({
        title: data.error ? 'Error!' : 'Busqueda',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
      if (!data.error) {
        this.data = data.ingresos;
      }
    }, (error) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error!',
        text: 'Consulta fallida',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    }
    );
  }

  switch(e) {
    this.p = e;
  }

  sort(key) {
    if (key === this.key) {
      this.reverse = !this.reverse;
      if (!this.reverse) {
        this.key = 'id';
        this.reverse = true;
      }
    } else {
      this.key = key;
      this.reverse = false;
    }
  }

  add() {
    sessionStorage.removeItem('ingreso');
    this.router.navigate(['/dashboard/ingreso/form-ingreso']);
  }

  search(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  goTo(uri: string, ingreso: Ingreso) {
    sessionStorage.setItem('ingreso', JSON.stringify(ingreso));
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  showModalConfirmFolio(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  generatePDF(modal, id: number) {
    this.isLoading = true;
    this.ingresoService.getVisitasPplReport(id).subscribe((data: any) => {
      this.blobToPdf(data, "Reporte de visitas");
    }, error => {
      this.isLoading = false;
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el archivo',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }

  blobToPdf(data, name: string) {
    //conversión de binario a un archivo pdf
    const binaryData = [];
    binaryData.push(data);
    const filePath = window.URL.createObjectURL(new Blob(binaryData, { type: "application/pdf" }));
    const downloadLink = document.createElement("a");
    downloadLink.href = filePath;
    downloadLink.setAttribute("download", name);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}

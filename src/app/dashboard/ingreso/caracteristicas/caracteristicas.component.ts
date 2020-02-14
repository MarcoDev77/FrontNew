import {Component, OnInit} from '@angular/core';
import {Ingreso} from '@shared/models/Ingreso';
import {IngresoService} from '@shared/services/ingreso.service';
import {Caracteristica} from '@shared/models/Caracteristica';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Imputado} from '@shared/models/Imputado';
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss']
})
export class CaracteristicasComponent implements OnInit {
  public ingreso: Ingreso;
  public caracteristica: Caracteristica;

  constructor(
    private ingresoService: IngresoService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    $('image-map').imageMapResize();

    const ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    if (ingreso) {
      this.ingreso = ingreso;
    }
  }

  ngOnInit() {
    this.caracteristica = {} as Caracteristica;
  }

  find(label?) {
    return console.log('Hola', label, this.ingreso);
    this.ingresoService.getCaracteristica(label, this.ingreso.id).subscribe((data: any) => {
      console.log('DATA', data);
      this.caracteristica = data.senaParticular;
      this.caracteristica.clave = label;
    });
  }

  submit(array) {
    if (!this.validateFiels(array)) {
       return;
    }
    this.caracteristica.imputado = {} as Imputado;
    this.caracteristica.imputado.id = this.ingreso.id;
    this.ingresoService.saveCaracteritica(this.caracteristica).subscribe((data: any) => {
      console.log(data);
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      if (!data.error) {
        this.closeModals();
      }
    });
  }

  validateFiels(array: any[]): boolean {
    let pass = true;
    for (const field of array) {
      if (!field.valid) {
        pass = false;
        field.control.markAsTouched();
      }
    }
    return pass;
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  goToDactiloscopia() {
    sessionStorage.setItem('ingreso', JSON.stringify(this.ingreso));
    this.router.navigate(['/dashboard/ingreso/dactiloscopia']);
  }
}

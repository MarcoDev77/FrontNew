import { Component, OnInit } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ficha-ingreso',
  templateUrl: './ficha-ingreso.component.html',
  styleUrls: ['./ficha-ingreso.component.scss']
})
export class FichaIngresoComponent implements OnInit {
  public isLoading: boolean;
  public ingreso: any;
  public ficha: any
  constructor(private servicioSocialService: ServicioSocialService) { 
    this.ingreso= {} as any;
    this.ficha={} as any;
  }

  ngOnInit() {
  }

  searchImputado(){
    this.servicioSocialService.getInfoFichaIngreso(this.ingreso.folio).subscribe((data:any)=>{
      console.log(data)
      this.ingreso=data.imputado
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  };

  saveFicha(){
    this.ficha.imputado={
      id:this.ingreso.imputadoId
    }

    console.log(this.ficha)
    this.servicioSocialService.saveFichaIngreso(this.ficha).subscribe((data:any)=>{
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }
}

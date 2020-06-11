import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beneficio-estatal',
  templateUrl: './beneficio-estatal.component.html',
  styleUrls: ['./beneficio-estatal.component.scss']
})
export class BeneficioEstatalComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public isLoading: boolean
  public beneficio: any
  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.ingreso = {} as any
    this.beneficio = {} as any
  }


  searchImputado(ingreso?) {
    console.log(ingreso)
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }
    this.isLoading = true
    this.servicioSocialService.getInfoFichaIngreso(this.ingreso.folio).subscribe((data: any) => {
      console.log(data)
      this.ingreso = data.imputado
      Swal.fire({
        title: data.error ? 'Error!' : 'Resultados',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.isLoading = false
    })
  }

  cleanForm() {

  }


}

class BeneficioEstatal {
  relacionInterfamiliarPrimario: String
  grupoFamiliarPrimario: String
  violenciaIntrafamiliarPrimario: Boolean
  violenciaEspecificarPrimario: String
  nivelSocioeconomicoPrimario: String
  familiarAntecedentesAdiccionPrimario: String
  familiarEspecifiquePrimario: String
  hijosAnteriores: number
  grupoFamiliarSecundario: String
  relacionInterfamiliarSecundario: String
  violenciaIntrafamiliarSecundario: Boolean
  violenciaEspecificarSecundario: String
  nivelSocioeconomicoSecundario: String
  familiarAntecedentesAdiccionSecundario: String
  familiarEspecifiqueSecundario: String
  familiaConductaAntisocial: String
  conductaAntisocialEspecifique: String
  numeroParejasEstables: Number
  apoyoFamiliar: Boolean
  visitaFamiliar: Boolean
  frecuencia: String
  visitadoPersonas: Boolean
  diagnosticoPronostico: String
  opinionBeneficiosInternos: String
}
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-translado-federal',
  templateUrl: './translado-federal.component.html',
  styleUrls: ['./translado-federal.component.scss']
})
export class TransladoFederalComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public isLoading: boolean
  public traslado: Traslado
  public file: any
  constructor(
    private servicioSocialService: ServicioSocialService,
    private modalService: NgbModal) 
    {
      this.ingreso={} as any
      this.traslado={} as any
      this.isLoading= false;
     }

  ngOnInit() {
  }

  searchImputado(ingreso?) {
    console.log(ingreso)
    if (ingreso) {
      this.ingreso = { ...ingreso };
    }  
    this.isLoading = true
    this.servicioSocialService.getInfoTrasladoFederal(this.ingreso.folio).subscribe((data: any) => {
      console.log(data)
      if(!data.error){
        this.ingreso = data.imputado
        this.traslado=data.imputado.trasladoFederal
      }
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

class Traslado {
  direccionPrevia: String
  ocupacionPrevia: String
  tiempoLaboral: String
  sueldo: String
  tipoZona: String
  indicesDelictivos: Boolean
  sobrePoblacion: Boolean
  girosNegros: Boolean
  presenciaPoliciaca: Boolean
  consumoViaPublica: Boolean
  tipoFamilia: String
  tipoComunicacionPrimaria: String
  tipoRelacionFamiliarPrimaria: String
  nivelSocioEconomico: String
  usoDrogasFamilia: String
  tipoSustancia: String
  miembroFamiliarDetenido: String
  tipoDelitoDuracionLugar: String
  tipoComunicacionSecundaria: String
  tipoRelacionFamiliarSecundaria: String
  situacionFamiliar: String
  municipioPrimaria: String
  municipioSecundaria: String
  apoyoExterior: String
  residiraEgresarReclucion: String
  dondeResidiraEgresarReclucion: String
  opinionEvolucionInterno: String
  opinionSobreTraslado: String
}

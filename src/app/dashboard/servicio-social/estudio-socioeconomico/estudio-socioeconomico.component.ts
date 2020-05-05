import { Component, OnInit } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudio-socioeconomico',
  templateUrl: './estudio-socioeconomico.component.html',
  styleUrls: ['./estudio-socioeconomico.component.scss']
})
export class EstudioSocioeconomicoComponent implements OnInit {
  public ingreso : any
  public moreInputs: any[]
  public estudio:any
  constructor(private servicioSocialService: ServicioSocialService) { 
    this.ingreso= {} as any
    this.estudio={} as any
    this.moreInputs = [
      {label: 'Ocupación', value: 'Carpintero'},
      {label: 'Domicilio', value: 'a'},
      {label: 'Lugar nacimiento', value: 'Mexico'},
      {label: 'Dialecto', value: 'Español'},
    ];
  }

  ngOnInit() {
  }

  searchImputado(){
    this.servicioSocialService.getEstudioSocioEconomico(this.ingreso.folio).subscribe((data:any)=>{
        console.log(data)
        if(!data.error){
        this.ingreso=data.imputado;
        this.estudio=data.imputado.estudioSocioeconomico;
        }
        Swal.fire({
          title: data.error ? 'Error!' : 'Busqueda',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1000,
          showConfirmButton: false
        });
    })
  }

  saveEstudioSocioeconomico(){
    this.estudio.imputado={id:this.ingreso.imputadoId}
    console.log("To server",this.estudio)
    this.servicioSocialService.saveEstudioSocioeconomico(this.estudio).subscribe((data:any)=>{
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1000,
        showConfirmButton: false
      });
    })
  }

}

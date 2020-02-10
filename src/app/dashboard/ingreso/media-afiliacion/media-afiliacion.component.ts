import { Component, OnInit } from '@angular/core';
import {Mediafiliacion} from '@shared/models/MediaFiliacion';
import { IngresoService } from '@shared/services/ingreso.service';
import Swal from 'sweetalert2';
import { Ingreso } from '@shared/models/Ingreso';

@Component({
  selector: 'app-media-afiliacion',
  templateUrl: './media-afiliacion.component.html',
  styleUrls: ['./media-afiliacion.component.scss']
})
export class MediaAfiliacionComponent implements OnInit {

  complexion: any;
  estatura: any;
  peso: any;
  tez: any;
  obj: any;
  public ingreso:Ingreso;
  
  public validador=[false,false,false,false,false,false,false,false,false,false,false];
  public mediaFiliacion: Mediafiliacion;
  constructor(private ingresoService: IngresoService) {
    this.complexion = '';
    this.estatura = '';
    this.peso = '';
    this.tez = '';
    this.obj = {} as any;
    this.mediaFiliacion= {} as any;
        
  }

  ngOnInit() {
    this.getData();
  }

  getComplexion(id) {
    switch (id) {
      case '1':
        return 'Delgada';
        break;
      case '2':
        return 'Regular';
        break;
      case '3':
        return 'Atlética';
        break;
      case '4':
        return 'Robusta';
        break;
      case '5':
        return 'Obesa';
        break;
    }
  }
  public getData(){
    this.ingreso = JSON.parse(sessionStorage.getItem('ingreso'));
    this.mediaFiliacion.imputado={
      id:1
    }
    console.log(this.mediaFiliacion.imputado.id)
     this.ingresoService.getMediafiliacion(this.mediaFiliacion.imputado.id).subscribe((data:any)=>{
      console.log(data);
      if(data.caracteristicas){
      this.mediaFiliacion=data.caracteristicas;
      }else{
        
      }
    }) 

  }
  public guardarMediaFiliacion(flag){
   console.log("entra")
    this.mediaFiliacion.imputado= {
        id:1
    };
    console.log(this.mediaFiliacion)
      this.ingresoService.saveMediaFiliacion(this.mediaFiliacion).subscribe((data: any) => {
        this.mediaFiliacion.id=data.id;
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if(!data.error){

        }
      })
  }

  

  public formularioCompleto(){
    for (let i = 0; i < this.validador.length; i++) {
      if(this.validador[i]==false){
        return false;
      }
    }
    return true;
  }
}

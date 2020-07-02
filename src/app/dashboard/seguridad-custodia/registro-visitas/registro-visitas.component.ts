import { Component, OnInit } from '@angular/core';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-visitas',
  templateUrl: './registro-visitas.component.html',
  styleUrls: ['./registro-visitas.component.scss']
})
export class RegistroVisitasComponent implements OnInit {
  public ingreso: any
  public moreInputs: any[]
  public referencia: any
  public isLoading: boolean
  public codigoBarras: String
  constructor(private SeguridadCustodiaService: SeguridadCustodiaService) { }

  ngOnInit() {
    this.referencia= {}as any
  }

  searchVisita(){
    this.SeguridadCustodiaService.searchVisita(this.codigoBarras).subscribe((data:any)=>{
      console.log(data)
      if(data.referencia){
        this.referencia=data.referencia
      }
      Swal.fire({
        title: data.error ? 'Error!' : 'Encontrado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }

  saveIngresoVisita(){
    let model= {
      referenciaId: this.referencia.id,
      codigoBarras: this.codigoBarras,
      numeroNinos: this.referencia.numeroNinos,
      tipoPase: this.referencia.tipoPase
    }
    this.SeguridadCustodiaService.saveIngresoVisita(model).subscribe((data:any)=>{
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }

  saveSalidaVisita(){
    let model= {
      id: this.referencia.id,
      codigoBarras: this.codigoBarras,
     
    }
    this.SeguridadCustodiaService.saveSalidaVisita(model).subscribe((data:any)=>{
      console.log(data)
      if(data.referencia&&data.error){
        this.referencia=data.referencia
        console.log("entra")
      }      
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado!',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
    })
  }
  

}

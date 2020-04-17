import { Component, OnInit } from '@angular/core';
import { ComiteTecnicoService } from '@shared/services/comite-tecnico.service';
import Swal from 'sweetalert2';
import { Imputado } from '@shared/models/Imputado';

@Component({
  selector: 'app-plan-actividades',
  templateUrl: './plan-actividades.component.html',
  styleUrls: ['./plan-actividades.component.scss']
})
export class PlanActividadesComponent implements OnInit {
  public isLoading: false;
  public generalidadesPPL: GeneralidadesPPL;
  public antecedentes : any[];
  public antecedente: Antecedente;
  public grupoCanaliza: GrupoCanaliza;

    // Table attributes
    public p;
    public filter: any;
    public reverse = true;
    public key = 'id'; // set default
    public isForm: boolean;
    public selectedRow: Number;
    public setClickedRow: (i) => void;
    public auxId: any;
  constructor(private comiteTecnicoService: ComiteTecnicoService) {
    this.generalidadesPPL= {} as any;
    this.generalidadesPPL.estadoCivil= {} as any;
    this.antecedente= {} as any
    this.grupoCanaliza= {} as any
    this.antecedentes= [];
    
    this.isLoading=false;
  }
  
  ngOnInit() {
  }

  
 
  searchImputado(showMessage = true){
    this.comiteTecnicoService.getImputadoByFolioPedagogia(this.generalidadesPPL.folio).subscribe((data:any)=>{
      console.log(data);
      this.generalidadesPPL=data.imputado;
      this.antecedentes=data.imputado.antecedentesConsumo;
      this.grupoCanaliza=data.imputado.grupoCanaliza;
      if (showMessage) {
        Swal.fire({
          title: data.error ? 'Error!' : 'Busqueda',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }
    })
  }

  saveAntecedente(array: any[]){
    if (this.validateFiels(array)) {
      this.antecedente.imputado = {id: this.generalidadesPPL.imputadoId};
      console.log('To server', this.antecedente);
      this.comiteTecnicoService.saveAntecedente(this.antecedente).subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.error ? 'Error!' : 'Guardado',
          text: data.mensaje,
          icon: data.error ? 'error' : 'success',
          timer: 1300,
          showConfirmButton: false
        });
        if (!data.error) {
          this.searchImputado(false);
          this.isForm = false;
        }
      });
    }
  }

  updateAntecedente(id, item) {
    this.isForm = true;
    this.antecedente = {...item};

    if (this.auxId && this.auxId !== id) {
      this.showTr();
      this.auxId = id;
    } else {
      this.auxId = id;
    }
    setTimeout(() => {
      this.hiddenTr();
      const tr = document.getElementById(this.auxId);
      const form = document.getElementById('table-form');

      tr.insertAdjacentElement('afterend', form);
    }, 50);
  }

  deleteAntecedente(item){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'El registro se eliminara.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then(({value}) => {
      if (value) {
        this.comiteTecnicoService.deleteAntecedente(item.id).subscribe((data: any) => {
          console.log(data);
          Swal.fire({
            title: data.error ? 'Error!' : 'Cambio exitoso.',
            text: data.mensaje,
            icon: data.error ? 'error' : 'success',
            timer: 1300,
            showConfirmButton: false
          }).finally(() => {
            if (!data.error) {
              this.cancel();
              this.searchImputado(false);
            }
          });
        });
      }
    });
  }

  saveGrupo(){
    this.grupoCanaliza.imputado={id: this.generalidadesPPL.imputadoId};
    this.comiteTecnicoService.saveGrupoCanaliza(this.grupoCanaliza).subscribe((data:any)=>{
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
   // Table methods

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

  cancel() {
    this.showTr();
    this.isForm = false;
    this.antecedente = {} as Antecedente;
  }

  switch(e) {
    this.p = e;
    this.cancel();
  }

  add() {
    this.antecedente = {} as Antecedente;
    this.isForm = true;
  }

  showTr() {
    if (this.auxId) {
      const tr = document.getElementById(this.auxId);
      const array: any = tr.childNodes;

      if (array) {
        for (const td of array) {
          td.style.display = 'table-cell';
        }
        this.auxId = '';
      }
    }
  }

  hiddenTr() {
    const tr = document.getElementById(this.auxId);
    const array: any = tr.childNodes;

    if (array) {
      for (const td of array) {
        td.style.display = 'none';
      }
    }
  }

}

class GeneralidadesPPL {
  imputadoId: number;
  folio: string;
  nombre: string;
  dormitorio: string;
  fechaNacimiento: Date;
  edad: number;
  estadoCivil: any;
  escolaridad: string;
  fechaIngreso: Date;
  sentencia: any;
  originario: any;
  listaDelitos: any;
  ficha:any;
  imputado: any;
  
}

class Antecedente{
  id: number 
  sustanciaConsumia: String
  edadInicio: String
  frecuenciaConsumo: String
  gradoConsumo: String 
  imputado: any
}

class GrupoCanaliza{
  grupo:string;
  area:string;
  dias:string;
  observaciones:string
  imputado: any;
}
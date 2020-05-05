import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioSocialService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getInfoNucleFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliarl?folioImputado=${folio}`);


  saveMiembroNucleoFamiliar(model){
   return this.http.post(`${this.url}/api/registrarMiembroNucleoFamiliar`,model);
  }

  deleteMiembroNucleoFamiliar(model){
    return this.http.get(`${this.url}/api/eliminarMiembroNucleoFamiliar?miembroId=${model.id}`,);
  }

  getMiembrosNucleoFamiliar = model =>
  this.http.get(`${this.url}/api/listarMiembrosNucleoFamiliar?tipoNucleo=${model.tipoNucleo}&nucleoId=${model.nucleoId}`,);

  getInfoNucleoFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliar?folioImputado=${folio}`);

  saveNucleoFamiliar = model => this.http.post(`${this.url}/api/registrarNucleoFamiliar`, model);

  generatePDFEstudioTrabajoSocial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfEstudioTrabajoSocial?imputadoId=${id}`, { responseType });
  }

  getInfoFichaIngreso=folio=>{
    return this.http.get(`${this.url}/api/listarfichaIngresoTrabajoSocial?folioImputado=${folio}`);
  }

  saveFichaIngreso= model=>{
    return this.http.post(`${this.url}/api/registrarFichaIngresoTS`, model);
  }

  getEstudioSocioEconomico= folio=>{
    return this.http.get(`${this.url}/api/listarEstudioSocioeconomicoFolio?folioImputado=${folio}`);
  }


  saveEstudioSocioeconomico= model=>{
    return this.http.post(`${this.url}/api/registrarEstudioSocioeconomico`, model);
  }



}

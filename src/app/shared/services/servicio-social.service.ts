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
  
  getImputadoByFolio = folio => this.http.get(`${this.url}/api/buscarImputadoFolio?folioImputado=${folio}`);

  getInfoNucleoFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliar?folioImputado=${folio}`);

  saveNucleoFamiliar = model => this.http.post(`${this.url}/api/registrarNucleoFamiliar`, model);

  generatePDFEstudioTrabajoSocial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfEstudioTrabajoSocial?imputadoId=${id}`, { responseType });
  }

  getEntrevistasImputado = id => this.http.get(`${this.url}/api/listarEntrevistasImputado?imputadoId=${id}`);

  saveEntrevistaImputado = model => this.http.post(`${this.url}/api/registrarEntrevistaTrabajo`, model);

  generatePDFEntrevistaTrabajo = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfControlEntrevistaTrabajo?entrevistaId=${id}`, { responseType });
  }

}

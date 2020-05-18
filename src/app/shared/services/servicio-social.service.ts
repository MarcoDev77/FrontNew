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

  getInfoNucleFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliarl?folioImputado=${folio}`);


  saveMiembroNucleoFamiliar(model) {
    return this.http.post(`${this.url}/api/registrarMiembroNucleoFamiliar`, model);
  }

  deleteMiembroNucleoFamiliar(model) {
    return this.http.get(`${this.url}/api/eliminarMiembroNucleoFamiliar?miembroId=${model.id}`);
  }

  getMiembrosNucleoFamiliar = model =>
    this.http.get(`${this.url}/api/listarMiembrosNucleoFamiliar?tipoNucleo=${model.tipoNucleo}&nucleoId=${model.nucleoId}`);

  getInfoNucleoFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliar?folioImputado=${folio}`);

  saveNucleoFamiliar = model => this.http.post(`${this.url}/api/registrarNucleoFamiliar`, model);

  generatePDFEstudioTrabajoSocial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfEstudioTrabajoSocial?imputadoId=${id}`, { responseType });
  }

  getInfoFichaIngreso = folio => {
    return this.http.get(`${this.url}/api/listarfichaIngresoTrabajoSocial?folioImputado=${folio}`);
  }

  saveFichaIngreso = model => this.http.post(`${this.url}/api/registrarFichaIngresoTS`, model);


  getEntrevistasImputado = id => this.http.get(`${this.url}/api/listarEntrevistasImputado?imputadoId=${id}`);

  saveEntrevistaImputado = model => this.http.post(`${this.url}/api/registrarEntrevistaTrabajo`, model);

  generatePDFEntrevistaTrabajo = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfControlEntrevistaTrabajo?entrevistaId=${id}`, { responseType });
  }

  generatePDFPrevencionReadaptacion = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfPrevencionReadaptacion?imputadoId=${id}`, { responseType });
  }

  generatePDFOficioDirectorGeneral = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfDirectorGeneralSanciones?imputadoId=${id}`, { responseType });
  }

  getEstudioSocioEconomico = folio => {
    return this.http.get(`${this.url}/api/listarEstudioSocioeconomicoFolio?folioImputado=${folio}`);
  }

  saveEstudioSocioeconomico = model => {
    return this.http.post(`${this.url}/api/registrarEstudioSocioeconomico`, model);
  }

  listRefencias = id => this.http.get(`${this.url}/api/listarReferenciasPersonales?imputadoId=${id}`);

  getVisitas = id => this.http.get(`${this.url}/api/listarVisitasFamiliares?imputadoId=${id}`);

  saveVisitas = model => this.http.post(`${this.url}/api/registrarVisitaFamiliar`, model);

  marcarHoraSalidaVisita = id => this.http.get(`${this.url}/api/registrarSalidaVisitaFamiliar?visitaFamiliarId=${id}`);

  generatePDFFormatoPertenencias = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfReciboPertenencias?visitaFamiliarId=${id}`, { responseType });
  }

  getOficioSanciones = id => this.http.get(`${this.url}/api/listarImputadoOficioSanciones?imputadoId=${id}`);

  saveOficioSanciones = model => this.http.post(`${this.url}/api/registrarOficioSanciones`, model);

  generatePDFEstudioSocieconomico = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfTrabajoSocial?imputadoId=${id}`, { responseType });
  }

  generatePDFTrabajoSocial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfTrabajoSocial?imputadoId=${id}`, { responseType });
  }

}

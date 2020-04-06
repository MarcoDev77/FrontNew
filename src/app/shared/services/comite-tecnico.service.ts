import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComiteTecnicoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getImputadoByFolio = folio => this.http.get(`${this.url}/api/listarImputadoPorFolio?folioImputado=${folio}`);

  savePlandeActividades = model => {
    console.log('To server.savePlandeActividades', model);
    return this.http.post(`${this.url}/api/registrarPlanActividades`, model);
  };

  generatePDFDireccionIndustrial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfComiteTecnico?imputadoId=${id}`, {responseType});
  }

  saveExperienciaLaboral = model => this.http.post(`${this.url}/api/registrarExperienciaLAboral`, model);

  deleteExperienciaLaboral = id => this.http.delete(`${this.url}/api/eliminarExperienciaLAboral?idExperiencia=${id}`);

  getDataCentroEscolarbyFolio = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioEscolar?folioImputado=${folio}`);

  saveActividadesEscolares = model => this.http.post(`${this.url}/api/registrarActividadesEscolar`, model);

  generatePDFCentroEscolar = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfPlanActividadCentroEscolar?imputadoId=${id}`, {responseType});
  };

  getComiteDeportes = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioDeportivo?folioImputado=${folio}`);

  saveComiteDeporte = model => this.http.post(`${this.url}/api/registrarInformacionDeportiva`, model);

  generatePDFDeportes = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfEncuestaDeportiva?imputadoId=${id}`, {responseType});
  };

  getDataComiteOdontoligia = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioOdontologica?folioImputado=${folio}`);

  saveComiteOdontolofia = model => this.http.post(`${this.url}/api/registrarHistoriaClinica`, model);

}

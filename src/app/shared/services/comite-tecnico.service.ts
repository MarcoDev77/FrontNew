import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';

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

  saveExperienciaLaboral = model => this.http.post(`${this.url}/api/registrarExperienciaLAboral`, model);

  deleteExperienciaLaboral = id => this.http.delete(`${this.url}/api/eliminarExperienciaLAboral?idExperiencia=${id}`);

  getDataCentroEscolarbyFolio = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioEscolar?folioImputado=${folio}`);

  saveActividadesEscolares = model => this.http.post(`${this.url}/api/registrarActividadesEscolar`, model);

}

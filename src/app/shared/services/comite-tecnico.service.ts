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

  getImputadoByFolioPsicologia = folio => this.http.get(`${this.url}/api/listarImputadoPsicologia?folioImputado=${folio}`);

  getImputadoByFolioTrabajoSocial= folio => this.http.get(`${this.url}/api/listarImputadoTrabajoSocial?folioImputado=${folio}`);

  getImputadoByFolioPedagogia= folio => this.http.get(`${this.url}/api/listarImputadoPedagogia?folioImputado=${folio}`);

  saveFichaPsicologica = model => {
    console.log('To server.savePlandeActividades', model);
    return this.http.post(`${this.url}/api/registrarFicha`, model);
  };

  saveAntecedente=model=>{
    console.log('To server.saveAntecedente', model);
    return this.http.post(`${this.url}/api/registrarAntecedentesConsumo`, model);
  }

  deleteAntecedente = id => this.http.delete(`${this.url}/api/eliminarAntecedentesConsumo?idAntecedente=${id}`);

  saveGrupoCanaliza= model=>{
    console.log('To server.grupoCanaliza', model);
    return this.http.post(`${this.url}/api/registrarGrupoCanaliza`, model);
  }


}

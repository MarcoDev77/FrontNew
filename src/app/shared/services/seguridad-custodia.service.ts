import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguridadCustodiaService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getImputadoByFolio = folio => this.http.get(`${this.url}/api/buscarImputadoFolio?folioImputado=${folio}`);

  saveNombramiento = model => this.http.post(`${this.url}/api/registrarNombramiento`, model);

  listNombramientos = () => this.http.get(`${this.url}/api/listarNombramiento`);

  cambiarStatusNombramiento = id => this.http.delete(`${this.url}/api/actualizarEstatusNombramiento?nombramientoId=${id}`);

  getCapacitaciones = () => this.http.get(`${this.url}/api/listarCapacitacion`);

  saveCapacitaciones = model => this.http.post(`${this.url}/api/registrarCapacitacion`, model);

  changeStatusCapacitaciones = id =>
    this.http.delete(`${this.url}/api/actualizarEstatusCapacitacion?capacitacionId=${id}`)

  saveCustodio = model => this.http.post(`${this.url}/api/registrarCustodio`, model);

  listCustodios = () => this.http.get(`${this.url}/api/listarCustodio`);

  changeStatusCustodio = id => this.http.delete(`${this.url}/api/actualizarEstatusCustodio?custodioId=${id}`);

  saveAsistencia = model => this.http.post(`${this.url}/api/registarCustodioCapacitacion`, model);

  getAsistencias = id => this.http.get(`${this.url}/api/custodiosPorCapacitacion?capacitacionId=${id}`);

  getCapacitacionesByCustodio = id => this.http.get(`${this.url}/api/capacitacionesPorCustodio?custodioId=${id}`);

  getRevisiones = () => this.http.get(`${this.url}/api/listarRevisiones`);

  saveRevision = model => this.http.post(`${this.url}/api/registrarRevision`, model);

  saveImputadoOnRevision = model => this.http.post(`${this.url}/api/registarImputadoRevision`, model);

  getImputadosByRevision = id => this.http.get(`${this.url}/api/listarImputadosRevision?revisionId=${id}`);

  getObjetosRevision = (revisionId, imputadoId) => this.http.get(
    `${this.url}/api/listarObjetosDecomisados?revisionId=${revisionId}&imputadoId=${imputadoId}`
  );

  saveObjetoRevision = model => this.http.post(`${this.url}/api/registrarObjetoDecomisado`, model);

  deleteObjetosRevision = id => this.http.delete(`${this.url}/api/eliminarObjetoDecomisado?objetoId=${id}`);

  filterBusquedaListaIngresos = (filter, criteria) =>
    this.http.get(`${this.url}/api/busquedaConfiltro?filtro=${filter}&criterio=${criteria}`);

  generatePdfRevision = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfReporteDecomiso?revisionId=${id}`, { responseType });
  }
  searchVisita(codigoPostal: string) {
    return this.http.get(`${this.url}/api/buscarReferenciaCodigoBarras?codigoBarras=${codigoPostal}`);
  }

  saveIngresoVisita = model => this.http.post(`${this.url}/api/registrarIngresoVisita`, model);

  // tslint:disable-next-line:max-line-length
  saveSalidaVisita = model => this.http.get(`${this.url}/api/registrarSalidaVisita?referenciaId=${model.id}&codigoBarras=${model.codigoBarras}`);


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Ingreso } from '@shared/models/Ingreso';
import { Mediafiliacion } from '@shared/models/MediaFiliacion';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  data: any;
  params: string;

  public url: string;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.data = {};
    this.params = '';
  }

  saveMediaFiliacion(model: Mediafiliacion) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarCaracteristicasEspecificas`, this.data);
  }

  getMediafiliacion(id) {
    this.data = {
      id: id
    };
    return this.http.post(`${this.url}/api/findByCaracteristicasEspecificas`, this.data);
  }

  listIngreso(type: string) {
    return this.http.get(`${this.url}/api/listarIngresos?tipoConsulta=${type}`);
  }

  getIngreso(id) {
    return this.http.get(`${this.url}/api/consultarIngresoImputado?imputadoId=${id}`);
  }

  saveIngreso(model: Ingreso) {
    model.imputado.numeroHijos = Number(model.imputado.numeroHijos);
    this.data = model;
    return this.http.post(`${this.url}/api/registrarIngresoImputado`, this.data);
  }

  saveApodo(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarApodo`, this.data);
  }

  saveOldFolio(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/generarRegistroAntiguoImputado`, this.data);
  }

  seleccionarApodoPrincipal(id) {
    return this.http.get(`${this.url}/api/seleccionarApodoPrincipal?apodoId=${id}`);
  }

  savePreDelito(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registarIngresoDelito`, this.data);
  }

  editTraslado(model) {
    return this.http.put(`${this.url}/api/edicionImputadoTraslado`, model);
  }
  //SITUACION JURIDICA;
  getSituacionJuridica(id) {
    return this.http.get(`${this.url}/api/consultarIngresoImputado?imputadoId=${id}`);
  }

  saveSituacionJuridica(model) {
    return this.http.post(`${this.url}/api/registrarSituacionJuridica`, model);
  }

  listCausasPenales(id) {
    this.data = {
      id: id
    };
    return this.http.post(`${this.url}/api/listCausaPenal`, this.data);
  }

  listDelitosByCausasPenales(id) {
    return this.http.get(`${this.url}/api/listarDelitosPorCausa?causaId=${id}`);
  }

  listDelitosByCarpetaInvestigacion(id) {
    return this.http.get(`${this.url}/api/listarDelitosPorCarpeta?carpetaId=${id}`);
  }

  saveDelito(model) {
    return this.http.post(`${this.url}/api/registrarDelitosCausaOCarpeta`, model);
  }

  listRecursos = id => this.http.get(`${this.url}/api/consultarRecursosProbatorios?causaPenalId=${id}`);

  saveRecurso = model => {
    return this.http.post(`${this.url}/api/registrarRecursoProbatorio`, model);
  }

  deleteRecurso = id => this.http.get(`${this.url}/api/eliminarRecursoProbatorio?recursoId=${id}`);

  setRecursoAgotado = id => this.http.get(`${this.url}/api/marcarRecursoProbatorioAgotado?recursoId=${id}`);

  // CARACTERISTICAS
  getCaracteristica(clave, imputadoId) {
    return this.http.get(`${this.url}/api/consultarSenaParticular?clave=${clave}&imputadoId=${imputadoId}`);
  }

  saveCaracteritica(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarSenaParticular`, this.data);
  }

  listCaracteristicas(id) {
    return this.http.get(`${this.url}/api/listarSenasParticulares?imputadoId=${id}`);
  }

  // Datiloscopia
  saveDatosDactiloscopia(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarApodo`, this.data);
  }

  getDactiloscopia(id) {
    return this.http.get(`${this.url}/api/consultarInformacionDactiloscopia?imputadoId=${id}`);
  }

  selectIngresoDactiloscopia(imputadoId, imputadoCopiarId) {
    return this.http.get(`${this.url}/api/seleccionarHuellasIngresoImportar?imputadoId=${imputadoId}&imputadoCopiarId=${imputadoCopiarId}`);
  }

  finishIngreso(id) {
    return this.http.get(`${this.url}/api/marcarIngresoTerminado?imputadoId=${id}`);
  }

  listHuellasPersona = (id, offset, max) => {
    return this.http.get(`${this.url}/api/listarHuellasIngresoPersona?personaIngresadaId=${id}&offset=${offset}&max=${max}`);
  }

  generateFolio = (id = null) => this.http.get(`${this.url}/api/generarFolioImputado?personaIngresadaId=${id}`);

  listCarpetasInvestigacion = id => {
    return this.http.get(`${this.url}/api/listarCarpetasPorImputado?personaIngresadaId=${id}`);
  }

  saveCarpetaInvestigacion = model => {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarCarpetaInvestigacion`, this.data);
  }

  deleteCarpetaInvestigacion = carpetaId => {
    return this.http.delete(`${this.url}/api/bajaLogicaCarpetaInvestigacion?id=${carpetaId}`);
  }

  deleteDelito = delitoId => {
    return this.http.get(`${this.url}/api/eliminarDelitoCausaPenal?delitoId=${delitoId}`);
  }

  listCausaPenal = id => this.http.get(`${this.url}/api/listarCausaPenalPorImputado?personaIngresadaId=${id}`);

  saveCausaPenal = model => {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarCausaPenal`, this.data);
  }

  deleteCausaPenal = id => {
    return this.http.put(`${this.url}/api/bajaLogicaCausaPenal?id=${id}`, {});
  }

  getHistorialDelito = id => this.http.get(`${this.url}/api/historicoDelitos?delitoId=${id}`);

  getForografiasImputado = id => this.http.get(`${this.url}/api/consultarFotografiasImputado?imputadoId=${id}`);


  listRefencias = id => this.http.get(`${this.url}/api/listarReferenciasPersonales?imputadoId=${id}`);

  saveReferencia(model) {
    return this.http.post(`${this.url}/api/registrarReferenciaPersonal`, model);
  }

  deleteReferencia(id) {
    return this.http.delete(`${this.url}/api/eliminarReferenciaPersonal?idReferencia=${id}`);
  }

  getTipoProceso = () => this.http.get(`${this.url}/api/listaTipoProceso`);

  filterBusquedaListaIngresos(criteria) {
    return this.http.get(`${this.url}/api/busquedaConfiltro?criterio=${criteria}`);
    // this.http.get(`${this.url}/api/busquedaConfiltro?filtro=${filter}&criterio=${criteria}`);
  }

  getParentescos = () => this.http.get(`${this.url}/api/listarParentescos`);

  savePaseProvisional = (model) => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.post(`${this.url}/api/registrarPaseProvisional`, model, { responseType });
  }

  generatePDFControlVisitas = (id) => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfHojaControlVisita?imputadoId=${id}`, { responseType });
  }

  generatePDFPasePermanente = (model) => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.post(`${this.url}/api/registrarPasePermanente`, model, { responseType });
  }

  getVisitasPplReport(id: number) {
    console.log("data", { id });

    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Accept', 'application/pdf');

    return this.http.post(`${this.url}/api/visitasPPL`, { id }, { headers: this.headers, responseType: "blob" });
  }
}
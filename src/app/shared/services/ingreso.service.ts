import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Ingreso} from '@shared/models/Ingreso';
import {Mediafiliacion} from '@shared/models/MediaFiliacion';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  data: any;
  params: string;

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.data = {};
    this.params = '';
  }

  saveMediaFiliacion(model: Mediafiliacion) {
    this.data = model;

    console.log(this.data);
    return this.http.post(`${this.url}/api/registrarCaracteristicasEspecificas`, this.data);
  }

  getMediafiliacion(id) {
    this.data = {
      id: id
    };
    console.log(this.data);
    return this.http.post(`${this.url}/api/findByCaracteristicasEspecificas`, this.data);
  }

  listIngreso() {
    return this.http.get(`${this.url}/api/listarIngresos`);
  }

  getIngreso(id) {
    console.log('id', id);
    return this.http.get(`${this.url}/api/consultarIngresoImputado?imputadoId=${id}`);
  }

  saveIngreso(model: Ingreso) {
    model.imputado.estado = {id: 1};
    model.imputado.municipio = {id: 1};
    model.imputado.calleNumero = 'Villa #3';
    model.imputado.colonia = 'Villa Real';
    model.imputado.codigoPostal = 62577;
    model.imputado.paisNacimiento = {id: model.imputado.paisNacimientoSelect.value};
    model.imputado.religion = {id: model.imputado.religionSelect.value};
    model.imputado.estadoCivil = {id: model.imputado.estadoCivilSelect.value};
    model.imputado.ocupacion = {id: model.imputado.ocupacionSelect.value};
    model.imputado.gradoEstudio = {id: model.imputado.gradoEstudioSelect.value};
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarIngresoImputado`, this.data);
  }

  saveApodo(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarApodo`, this.data);
  }

  seleccionarApodoPrincipal(id) {
    return this.http.get(`${this.url}/api/seleccionarApodoPrincipal?apodoId=${id}`);
  }

  savePreDelito(model) {
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registarIngresoDelito`, this.data);
  }

  //SITUACION JURIDICA;
  getSituacionJuridica(id) {
    return this.http.get(`${this.url}/api/consultarIngresoImputado?imputadoId=${id}`);
  }

  saveSituacionJuridica(model){
    return this.http.post(`${this.url}/api/registrarSituacionJuridica`,model);
  }

  listCausasPenales(id){
    this.data={
      id:id
    }
    return this.http.post(`${this.url}/api/listCausaPenal`,this.data);
  }

  listDelitosByCausasPenales(model){
    this.data=model;
    return this.http.post(`${this.url}/api/delitosByImputadoAndCausaPenal`,this.data);

  }
  // CARACTERISTICAS
  getCaracteristica(clave, imputadoId) {
    return this.http.get(`${this.url}/api/consultarSenaParticular?clave=${clave}&imputadoId=${imputadoId}`);
  }

  saveCaracteritica(model) {
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarSenaParticular`, this.data);
  }

  // Datiloscopia
  saveDatosDactiloscopia(model) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarApodo`, this.data);
  }

  getDactiloscopia(id) {
    return this.http.get(`${this.url}/api/consultarInformacionDactiloscopia?imputadoId=${id}`);
  }

}

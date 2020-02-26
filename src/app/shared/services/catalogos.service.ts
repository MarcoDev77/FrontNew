import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {Delito} from '@shared/models/Delito';
import {TipoLibertad} from '@shared/models/TipoLibertdad';
import {ClasificacionJuridica} from '@shared/models/ClasificacionJuridica';
import {EnfermedadCronica} from '@shared/models/EnfermedadCronica';
import {MotivoReubicacion} from '@shared/models/MotivoReubicacion';
import {Dormitorio} from '@shared/models/Dormitorio';
import {TipoActividad} from '@shared/models/TipoActividad';
import {Actividad} from '@shared/models/Actividad';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  data: any;
  params: string;

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.data = {};
    this.params = '';
  }

// MODALIDAD DELITO
  listModalidadDelito(idDelito) {
    return this.http.get(`${this.url}/api/listarModalidadesDelito?tipoDelitoId=${idDelito}`);
  }

  saveModalidadDelito(model: ModalidadDelito) {
    this.data = model;
    if (!this.data.id) {
      this.data.id = null;
      this.data.estatus = true;
    }
    console.log(this.data);
    return this.http.post(`${this.url}/api/registrarModalidadDelito`, this.data);
  }

  deleteModalidadDelito(id) {
    return this.http.get(`${this.url}/api/eliminarModalidadDelito?delitoId=${id}`);
  }

  changeEstatusModalidadDelito(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusModalidadDelito?modalidadId=${id}`);
  }

// CENTRO PENITENCIARIO
  listCentroPenitenciario() {
    return this.http.get(`${this.url}/api/listarCentrosPenitenciarios`);
  }

  validAdminCentroPenitenciario(model) {
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarCentroPenitenciario`, this.data);
  }

  saveCentroPenitenciario(model: any) {
    model.id = model.id ? model.id : null;
    model.municipio = {
      id: model.municipioSelect.value
    };
    model.tipoCentro = {
      id: model.tipoCentroSelect.value
    };
    model.personal.area = {
      id: model.personal.areaSelect.value,
    };
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarCentroPenitenciario`, this.data);
  }

  deleteCentroPenitenciario(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusCentroPenitenciario?centroId=${id}`);
  }

  // PAISES, ESTADOS, MUNICIPIOS
  listPaises() {
    return this.http.get(`${this.url}/api/listarPaises`);
  }

  listEstados(region, idPais) {
    return this.http.get(`${this.url}/api/listarEstados?region=${region}&paisId=${idPais}`);
  }

  listMunicipios(region, idEstado) {
    return this.http.get(`${this.url}/api/listarMunicipios?region=${region}&estadoId=${idEstado}`);
  }

  // DELITO
  listDelito() {
    return this.http.get(`${this.url}/api/listarTipoDelitos`);
  }

  saveDelito(model: Delito) {
    model.id = model.id ? model.id : null;
    model.estatus = model.estatus ? model.estatus : true;
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarTipoDelito`, this.data);
  }

  deleteDelito(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusTipoDelito?delitoId=${id}`);
  }

  // TIPO DE LIBERTDAD

  listTipoLibertad() {
    return this.http.get(`${this.url}/api/listarTipoLibertades`);
  }

  saveTipoLibertad(model: TipoLibertad) {
    return this.http.post(`${this.url}/api/registrarTipoLibertad`, model);
  }

  changeStatusTipoDelito(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusTipoLibertad?tipoId=${id}`);
  }

  // CLASIFICACION JURIDICA

  listClasificacionJuridica() {
    return this.http.get(`${this.url}/api/listarClasificacionesJuridicas`);
  }

  saveClasificacionJuridica(model: ClasificacionJuridica) {
    return this.http.post(`${this.url}/api/registrarClasificacionJuridica`, model);
  }

  changeStatusClasificacionJuridica(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusClasificacionJuridica?clasificacionId=${id}`);
  }

  // ENFERMEDAD CRONICA
  listEnfermedadCronica() {
    return this.http.get(`${this.url}/api/listarEnfermedadesCronicas`);
  }

  saveEnfermedadCronica(model: EnfermedadCronica) {
    return this.http.post(`${this.url}/api/registrarEnfermedadCronica  `, model);
  }

  changeStatusEnfermedadCronica(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusEnfermedadCronica?enfermedadId=${id}`);
  }

  // MOTIVO REUBICACION
  listMotivoReubicacion() {
    return this.http.get(`${this.url}/api/listarMotivosReubicacion`);
  }

  saveMotivoReubicacion(model: MotivoReubicacion) {
    model.id = model.id ? model.id : null;
    console.log('To server', model);
    return this.http.post(`${this.url}/api/registrarMotivoReubicacion`, model);
  }

  changeStatusMotivoReubicacion(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusMotivoReubicacion?motivoId=${id}`);
  }

  // DORMITORIO
  listDormitorio(id) {
    return this.http.get(`${this.url}/api/listarDormitorios?centroId=${id}`);
  }

  saveDormitorio(model: Dormitorio) {
    model.id = model.id ? model.id : null;
    model.temporal = model.temporal ? model.temporal : false;
    console.log('To server', model);
    return this.http.post(`${this.url}/api/registrarDormitorio`, model);
  }

  changeStatusDormitorio(id) {
    console.log('ID', id);
    return this.http.get(`${this.url}/api/actualizarEstatusDormitorio?dormitorioId=${id}`);
  }

  // Tipo Actividad
  listTipoActividad(id) {
    return this.http.get(`${this.url}/api/listarTipoActividades?centroId=${id}`);
  }

  saveTipoActividad(model: TipoActividad) {
    model.id = model.id ? model.id : null;
    console.log('To server', model);
    return this.http.post(`${this.url}/api/registrarTipoActividad`, model);
  }

  changeStatusTipoActividad(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusTipoActividad?tipoId=${id}`);
  }

  // ACTIVIDAD
  listActividad(id) {
    return this.http.get(`${this.url}/api/listarActividades?tipoId=${id}`);
  }

  saveActividad(model: Actividad) {
    model.id = model.id ? model.id : null;
    console.log('To server', model);
    return this.http.post(`${this.url}/api/registrarActividad`, model);
  }

  changeStatusActividad(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusActividad?actividadId=${id}`);
  }

  // CATALOGOS ESTATICOS
  listTipoCentro = () => this.http.get(`${this.url}/api/listarTipoCentros`);

  listGradoEstudio = () => this.http.get(`${this.url}/api/listarGradosEstudio`);

  listReligiones = () => this.http.get(`${this.url}/api/listarReligiones`);

  listEstadosCiviles = () => this.http.get(`${this.url}/api/listarEstadosCiviles`);

  listOcupaciones = () => this.http.get(`${this.url}/api/listarOcupaciones`);

  //USUARIOS
  saveUsuario(model) {
    model.user.roles = [{id: model.user.roles.value}];
    console.log('model', model);
    return this.http.post(`${this.url}/api/registrarPersonal`, model);
  }

  listUsuarios() {
    return this.http.get(`${this.url}/api/listPersonal?centroId=1`);
  }

  toggleUsuario(model) {
    return this.http.put(`${this.url}/api/statusPersonal`, model);
  }

  listRoles = () => this.http.get(`${this.url}/api/listarRoles`);
  listAreas = () => this.http.get(`${this.url}/api/listAreas`);


}



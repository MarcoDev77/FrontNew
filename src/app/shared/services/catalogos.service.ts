import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {Delito} from '@shared/models/Delito';

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
  listModalidadDelito() {
    return this.http.get(`${this.url}/api/listarModalidadesDelito`);
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
  saveCentroPenitenciario(model: CentroPenitenciario) {
    model.id = model.id ? model.id : null;
    model.municipio = {
      id: model.municipioSelect.value
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
    model.modalidadDelito = {
      id: model.modalidadDelitoSelect.value
    };
    this.data = model;
    console.log('To server', this.data);
    return this.http.post(`${this.url}/api/registrarTipoDelito`, this.data);
  }
  deleteDelito(id) {
    return this.http.get(`${this.url}/api/actualizarEstatusTipoDelito?delitoId=${id}`);
  }
}

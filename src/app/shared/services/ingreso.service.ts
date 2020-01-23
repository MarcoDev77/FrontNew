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

  listIngreso(id) {
    return this.http.get(`${this.url}/api/consultarIngresoImputado?imputadoId=${id}`);
  }
  saveIngreso(model: Ingreso) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarIngresoImputado`, this.data);
  }

}

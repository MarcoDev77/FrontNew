import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformaticaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getVisitasImputado = (id) => this.http.get(`${this.url}/api/visitasImputado?idImputado=${id}`);

  updateCentro = (centroId) => this.http.post(`${this.url}/api/actualizarCentroInformatica`, { centroId });

  generatePDFFormatoPdfReporteVisitaCredencial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfReporteVisitaCredencial?imputadoId=${id}`, { responseType });
  }
  generarPdfCedulaInterno = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfMergeCedulaIdentificacion?imputadoId=${id}`, { responseType });
  }

  searchReferenciaPersonal = model => {
    if (model.codigoBarras) {
      return this.http.get(`${this.url}/api/buscarReferenciasPersonalesCodigo?codigoBarras=${model.codigoBarras}`)
    } else {
      return this.http.get(`${this.url}/api/buscarPplReferenciasNombre?nombre=${model.nombre}&apellidoPaterno=${model.apellidoPaterno}&apellidoMaterno=${model.apellidoMaterno}&tipoBusqueda=${model.tipoBusqueda}`)
    }
  }

  saveRestriccion = model => {
    if (model.tipo == 'imputado') {
      return this.http.post(`${this.url}/api/registrarRestriccionVisita`, model)
    } else {
      return this.http.post(`${this.url}/api/registrarRestriccionVisitaReferencia`, model)
    }
  }

  deleteRestriccion(id, tipo) {
    if (tipo == "imputado") {
      return this.http.get(`${this.url}/api/eliminarRestriccionVisitaImputado?restriccionId=${id}`)

    } else {
      return this.http.get(`${this.url}/api/eliminarRestriccionVisitaReferencia?restriccionId=${id}`)

    }
  }
}

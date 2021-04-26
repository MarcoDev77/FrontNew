import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JuridicoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getImputado = (folio) => this.http.get(`${this.url}/api/consultarDatosImputado?folio=${folio}`);

  saveBaja(data) {
    return this.http.post(`${this.url}/api/registrarDatosJuridicosDelito`,data);
  }

  registrarObservacion(data) {
    return this.http.post(`${this.url}/api/actualizarObservacionImputado`,data);
  }
}

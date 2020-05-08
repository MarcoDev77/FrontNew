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

  getCapacitaciones = () => this.http.get(`${this.url}/api/listarCapacitacion`);

  saveCapacitaciones = model => this.http.post(`${this.url}/api/registrarCapacitacion`, model);

  changeStatusCapacitaciones = id =>
    this.http.delete(`${this.url}/api/actualizarEstatusCapacitacion?capacitacionId=${id}`);
}

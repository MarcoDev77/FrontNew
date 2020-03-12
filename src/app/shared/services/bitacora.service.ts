import { Injectable } from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  data: any;
  params: string;
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
    this.data = {};
    this.params = '';
  }

  listBitacoraIngreso() {
    return this.http.get(`${this.url}/api/bitacoraIngresos`);
  }

  listBitacoraIngresoImputado() {
    return this.http.get(`${this.url}/api/bitacoraImputado`);
  }
}

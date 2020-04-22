import { Injectable } from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  listBitacoraIngreso(max, offset) {
    return this.http.get(`${this.url}/api/bitacoraIngresos?offset=${offset}&max=${max}`);
  }

  listBitacoraIngresoImputado() {
    return this.http.get(`${this.url}/api/bitacoraImputado`);
  }
}

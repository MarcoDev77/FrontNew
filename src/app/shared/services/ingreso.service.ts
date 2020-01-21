import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Ingreso} from '@shared/models/Ingreso';

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

  saveIngreso(model: Ingreso) {
    this.data = model;
    return this.http.post(`${this.url}/api/registrarIngresoImputado`, this.data);
  }

}

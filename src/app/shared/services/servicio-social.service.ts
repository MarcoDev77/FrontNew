import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioSocialService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getInfoNucleFamiliar = folio =>
    this.http.get(`${this.url}/api/buscarRegistroNucleoFamiliarl?folioImputado=${folio}`);
}

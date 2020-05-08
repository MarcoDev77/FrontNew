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

  
}
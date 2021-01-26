import { Component, OnInit } from '@angular/core';
import { ServicioSocialService } from '@shared/services/servicio-social.service';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registro-pase-unico',
  templateUrl: './registro-pase-unico.component.html',
  styleUrls: ['./registro-pase-unico.component.scss']
})
export class RegistroPaseUnicoComponent implements OnInit {
  public isLoading: boolean
  public isLoadingData: boolean
  public visitas: any[]
  public criteria: any
  public dormitorios: any[]

  public p;
  public filter: any;
  public reverse = true;
  public key = 'id'; // set default

  constructor(private servicioSocialService: ServicioSocialService, private catalogoService: CatalogosService) {
    this.isLoading = false
    this.isLoadingData = false
    this.criteria = {} as any
    this.visitas = []
    this.dormitorios = []

  }

  ngOnInit() {
    this.getDormitorios();

  }

  getDormitorios() {
    this.catalogoService.listDormitoriosAsignados().subscribe((data: any) => {
      if (data.dormitorios) {
        this.dormitorios = data.dormitorios
      }
    })
  }

  searchVisitas() {
    this.isLoadingData = true

    this.servicioSocialService.searchByDate(this.criteria).subscribe((data: any) => {
      if (data.pases) {
        this.visitas = data.pases
        this.clearSearch()
      }
      this.isLoadingData = false
    })

  }
  clearSearch() {
    this.criteria = {} as any
  }
  switch($event) { }
  sort(key) {
    if (key === this.key) {
      this.reverse = !this.reverse;
      if (this.reverse === false) {
        this.key = 'id';
        this.reverse = true;
      }
    } else {
      this.key = key;
      this.reverse = false;
    }
  }
  search = (text$: Observable<string>) => {
    return text$.pipe(
      map(term => term === '' ? []
        : this.dormitorios.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  };
  formatter = (x: { nombre: string }) => x.nombre;
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Ingreso } from '@shared/models/Ingreso';
import { SeguridadCustodiaService } from '@shared/services/seguridad-custodia.service';

@Component({
  selector: 'app-finder-imputado',
  templateUrl: './finder-imputado.component.html',
  styleUrls: ['./finder-imputado.component.scss']
})
export class FinderImputadoComponent implements OnInit {

  public isLoadingSearchFolio: boolean;
  public isLoadingSearchName: boolean;
  public criteria: string;
  public listIngreso: any[];
  public ingresoSelected: any;
  @Output() onSelectIngresoSearch = new EventEmitter();
  @Output() onClearSearch = new EventEmitter();
  @Input() isLoading: boolean;
  constructor(private seguridadCustodioService: SeguridadCustodiaService) { }

  ngOnInit() {
    this.ingresoSelected = {};
  }
  search(): void {
    this.isLoadingSearchFolio = true;
    this.isLoadingSearchName = true;
    this.listIngreso = [];
    this.seguridadCustodioService.filterBusquedaListaIngresos('folio', this.criteria)
      .subscribe((data: any) => {
        this.isLoadingSearchFolio = false;
        if (!data.error) {
          this.listIngreso = [...this.listIngreso, ...data.ingresos];
        }
      });
    this.seguridadCustodioService.filterBusquedaListaIngresos('nombre', this.criteria)
      .subscribe((data: any) => {
        this.isLoadingSearchName = false;
        if (!data.error) {
          this.listIngreso = [...this.listIngreso, ...data.ingresos];
        }
      });
  }

  selectIngreso(ingreso): void {
    this.ingresoSelected = { ...ingreso };
    this.listIngreso = this.listIngreso.filter(ingreso => ingreso.id === this.ingresoSelected.id);
    this.onSelectIngresoSearch.emit(this.ingresoSelected);
  }
  clearSearch(): void {
    this.listIngreso = [];
    this.ingresoSelected = {};
    this.onClearSearch.emit();
  }
}

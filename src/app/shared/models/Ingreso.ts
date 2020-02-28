import {Imputado} from '@shared/models/Imputado';

export class Ingreso {
  id?: number;
  folio: string;
  numeroExpediente: string;
  numeroControlRenip: number;
  tipoImputado: string;
  categoria: string;
  tipoIngreso: string;
  imputado: Imputado;
  clasificacion?: string;
  edadAparente: number;
  esTraslado: boolean;
  centroOrigen: string;
}

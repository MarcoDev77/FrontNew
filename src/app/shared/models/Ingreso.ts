import {Imputado} from '@shared/models/Imputado';

export class Ingreso {
  id?: number;
  folio: string;
  numeroExpediente: string;
  numeroControRenip: number;
  tipoImputado: string;
  categoria: string;
  tipoIngreso: string;
  imputado: Imputado;
  clasificacion?: string;
}

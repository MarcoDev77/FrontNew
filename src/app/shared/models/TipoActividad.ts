import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';

export class TipoActividad {
  id?: number;
  descripcion: string;
  estatus: boolean;
  fechaIngreso: Date;
  fechaActualizacion: Date;
  centroPenitenciario: any;
}

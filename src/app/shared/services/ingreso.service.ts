import {Injectable} from '@angular/core';
import {environment} from '@environment/environment';
import {HttpClient} from '@angular/common/http';
import {ModalidadDelito} from '@shared/models/ModalidadDelito';
import {CentroPenitenciario} from '@shared/models/CentroPenitenciario';
import {Delito} from '@shared/models/Delito';
import {TipoLibertad} from '@shared/models/TipoLibertdad';
import {ClasificacionJuridica} from '@shared/models/ClasificacionJuridica';
import {EnfermedadCronica} from '@shared/models/EnfermedadCronica';
import {MotivoReubicacion} from '@shared/models/MotivoReubicacion';
import {Dormitorio} from '@shared/models/Dormitorio';
import {TipoActividad} from '@shared/models/TipoActividad';
import {Actividad} from '@shared/models/Actividad';
import { Mediafiliacion } from '@shared/models/MediaFiliacion';

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

  saveMediaFiliacion(model: Mediafiliacion) {
    this.data = model;
    
    console.log(this.data);
    return this.http.post(`${this.url}/api/registrarCaracteristicasEspecificas`, this.data);
  }

  
}


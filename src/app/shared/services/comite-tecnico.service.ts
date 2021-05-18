import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComiteTecnicoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  getImputadoByFolio = folio => this.http.get(`${this.url}/api/listarImputadoPorFolio?folioImputado=${folio}`);

  savePlandeActividades = model => {
    return this.http.post(`${this.url}/api/registrarPlanActividades`, model);
  };

  generatePDFDireccionIndustrial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfComiteTecnico?imputadoId=${id}`, { responseType });
  }

  saveExperienciaLaboral = model => this.http.post(`${this.url}/api/registrarExperienciaLAboral`, model);

  deleteExperienciaLaboral = id => this.http.delete(`${this.url}/api/eliminarExperienciaLAboral?idExperiencia=${id}`);

  getImputadoByFolioPsicologia = folio => this.http.get(`${this.url}/api/listarImputadoPsicologia?folioImputado=${folio}`);

  getImputadoByFolioTrabajoSocial = folio => this.http.get(`${this.url}/api/listarImputadoTrabajoSocial?folioImputado=${folio}`);

  getImputadoByFolioPedagogia = folio => this.http.get(`${this.url}/api/listarImputadoPedagogia?folioImputado=${folio}`);

  saveFichaPsicologica = model => {
    return this.http.post(`${this.url}/api/registrarFicha`, model);
  };

  saveAntecedente = model => {
    return this.http.post(`${this.url}/api/registrarAntecedentesConsumo`, model);
  }

  deleteAntecedente = id => this.http.delete(`${this.url}/api/eliminarAntecedentesConsumo?idAntecedente=${id}`);

  saveGrupoCanaliza = model => {
    return this.http.post(`${this.url}/api/registrarGrupoCanaliza`, model);
  }


  getDataCentroEscolarbyFolio = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioEscolar?folioImputado=${folio}`);

  saveActividadesEscolares = model => this.http.post(`${this.url}/api/registrarActividadesEscolar`, model);

  generatePDFCentroEscolar = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfPlanActividadCentroEscolar?imputadoId=${id}`, { responseType });
  };

  getComiteDeportes = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioDeportivo?folioImputado=${folio}`);

  saveComiteDeporte = model => this.http.post(`${this.url}/api/registrarInformacionDeportiva`, model);

  generatePDFDeportes = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfEncuestaDeportiva?imputadoId=${id}`, { responseType });
  };

  getDataComiteOdontoligia = folio => this.http.get(`${this.url}/api/listarImputadoPorFolioOdontologica?folioImputado=${folio}`);

  saveComiteOdontolofia = model => this.http.post(`${this.url}/api/registrarHistoriaClinica`, model);

  generatePDFOdontologia = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfHistoriaClinicaOdontologica?imputadoId=${id}`, { responseType });
  };


  generatePDFPlanActividades = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfPlanActividadPedagogia?imputadoId=${id}`, { responseType });
  };

  generatePDFPsicologia = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfFichaPsicologia?imputadoId=${id}`, { responseType });
  };

  getImputadoByFolioGeneral = folio => this.http.get(`${this.url}/api/buscarImputadoFolio?folioImputado=${folio}`);

  buscarDocumentoResultadoExamen = (id, clave) => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/buscarDocumentoResultadoExamen?imputadoId=${id}&claveDocumento=${clave}`, { responseType });
  }

  saveActividadestrabajoSocial = model => {
    return this.http.post(`${this.url}/api/registrarActividadesTrabajo`, model);
  }

  generatePDFTrabajoSocial = id => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(`${this.url}/api/generarFormatoPdfPlanActividadTrabajoSocial?imputadoId=${id}`, { responseType });
  };

  checkDocumentsResultadosImputado = id =>
    this.http.get(`${this.url}/api/listarDocumentosResultadoImputado?imputadoId=${id}`);

  getDatosDocumentosGuardados = (clave, id) =>
    this.http.get(
      `${this.url}/api/consultarDatosDocumentoGuardado?claveDocumento=${clave}&imputadoId=${id}`
    );

  generatePDFDocumentoGuardado = (clave, id) => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.get(
      `${this.url}/api/buscarDocumentoGuardado?claveDocumento=${clave}&imputadoId=${id}`,
      { responseType }
    );
  };


  generatePDFInvitacionTaller = model => {
    const responseType = 'arraybuffer' as 'json';
    return this.http.post(
      `${this.url}/api/registrarInvitacionTaller`, model,
      { responseType }
    );
  };
}

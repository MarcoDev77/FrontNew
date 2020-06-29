export class EstudioTrabajoSocial {
  id: number;
  // Grupo Familiar Primario
  dinamicaFamiliarPrimaria: string;
  familiarPrimarioCompleto: string;
  familiarPrimarioIntegrado: string;
  familiarPrimarioOrganizado: string;
  familiarPrimarioFuncional: string;
  grupoFamiliarPrimario: string;
  // Grupo Familiar Secundario
  familiarSecundarioCompleto: string;
  familiarSecundarioIntegrado: string;
  familiarSecundarioOrganizado: string;
  familiarSecundarioFuncional: string;
  unionesAnteriores: number;
  hijosProcreados: number;
  dinamicaFamiliarSecundaria: string;
  grupoFamiliarSecundario: string;
  // Vivienda
  tipoVivienda: string;
  // Caracteristicas de la vivienda
  caracteristicasVivienda: string;
  // Material de contruccion
  materialConstruccion: string;
  detalleMaterialContruccion: string;
  // Servicios publicos
  serviciosPublicos = false;
  detalleServiciosPublicos: string;
  telefonoFamiliar: string;
  versionDelito: string;
  // Situacion economica
  responsableSolvencia: string;
  parentesco: any;
  parentescoResponsable: any;
  ocupacionResponsable: string;
  ingresoMensualResponsable: number;
  apoyaEconomicamente: string;
  nivelEconomico: string;
  // Area social
  actitudFamilia: string;
  personasVisitan: string;
  frecuenciaVisita: string;
  // Desarrollo
  desarrolloIntrainstitucional: string;

  pronostico: string;

  tratamiento: string;

  imputado: any;
  // Datos nucleo Familiar
  hijosUnionesS: string;
  numeroParejasS: number;
}

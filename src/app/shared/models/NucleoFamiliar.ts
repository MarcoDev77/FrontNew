import { Parentesco } from './Parentesco';

export class NucleoFamiliar {
    id: number;
    // Núcleo Primario
    caracteristicaZonaP: string;
    responsableManuntencionP: string;
    ingresosMensualesP: number;
    egresosMensualesP: number;
    cooperaDineroInternoP = false;
    tieneAhorrosP = false;
    grupoFamiliarP: string;
    relacionesInterfamiliaresP: string;
    huboViolenciaP = false;
    detalleViolenciaP: string;
    nivelSocioeconomicoP: string;
    tieneFamiliarAntecedentesP = false;
    detalleFamiliarAntecentesP: string;
    conceptoFamiliaInternoP: string;
    // Núcleo Secundario
    hijosUnionesS: string;
    grupoFamiliarS: string;
    relacionesInterfamiliaresS: string;
    huboViolenciaS = false;
    detalleViolenciaS: string;
    nivelSocioeconomicoS: string;
    numeroHabitacionesS: number;
    descripcionViviendaS: string;
    transporteS: string;
    mobiliarioEnseresS: string;
    caracteristicaZonaS: string;
    relacionMedioExternoS: string;
    tieneFamiliarProblemasConductaS = false;
    detalleProblemasConductaS: string;
    numeroParejasS: number;
    // Datos del interno    
    trabajoDesempenado: string;
    tiempoLaborar: string;
    sueldo: number;
    aportacionesEconomicas: string;
    distribucionGasto: string;
    alimentacionFamiliar: string;
    serviciosPublicos: string;
    tieneOfertaTrabajo = false;
    detalleOfertaTrabajo: string;
    tieneApoyoFamiliar = false;
    tieneVisitasFamiliar = false;
    radicanEstadoVisitas = false;
    frecuenciaVisitas: string;
    esVisitadoOtros = false;
    detalleVisitasOtros: string;
    nombreAvalMoral: string;
    parentescoAvalMoral: Parentesco;
    nombreViviraExternado: string;
    parentescoVivira: Parentesco;
    calleVivira: string;
    numeroVivira: number;
    coloniaVivira: string;
    codigoPostalVivira: number;
    municipioVivira: string;
    ciudadVivira: string;
    estadoVivira: any;
    opinionInternamiento: string;
    influenciadoInstancia: string;
    diagnosticoSocial: string;
    opinionConsecionBeneficios: string;
    imputado: any;
}
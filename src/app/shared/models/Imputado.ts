export class Imputado {
  id?: number;
  curp: string;
  fechaNacimiento: any;
  edadAparente: number;
  genero: string;
  codigoPostal: number;
  colonia: string;
  calleNumero: string;
  numeroHijos: number;
  nombrePadre?: string;
  nombreMadre?: string;
  etnia?: string;
  esIndigena: boolean;
  hablaIndigena?: string | boolean;
  municipio: any;
  municipioSelect: any;
  paisNacimiento: any;
  paisNacimientoSelect: any;
  estadoDomicilio: any;
  estadoDomicilioSelect: any;
  religion: any;
  religionSelect: any;
  estadoCivil: any;
  estadoCivilSelect: any;
  ocupacion: any;
  gradoEstudio: any;
  apodos: any[];
  delitos: any[];
  mainName: any;
  finadoPadre: boolean;
  finadoMadre: boolean;
  // Lugar Nacimirnto
  estadoNacimiento: any;
  estadoNacimientoSelect: any;
  municipioNacimiento: string;
}

// Date fechaNacimiento
// int edadAparente
// String genero
// int numeroHijos
// String nombrePadre
// String nombreMadre
// Boolean finadoPadre
// Boolean finadoMadre
// String etnia
// boolean esIndigina
// boolean hablaIndigena
// Date fechaRegistro
// Boolean esTraslado
// String centroOrigen
// String ocupacion
// String gradoEstudio
// String municipioNacimiento
// String codigoPostal
// String colonia
// String calleNumero
//
// static belongsTo = [
//   municipio: Municipio,
//   paisNacimiento: Pais,
//   estadoNacimiento: Estado,
//   estadoDomicilio: Estado,
//   religion: Religion,
//   estadoCivil: EstadoCivil,
//
// ]

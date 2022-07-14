import { roles as r } from '../../shared/helpers/roles';

export const ROUTES: RouteInfo[] = [
  {
    roles: [
      r.test.role,
      r.admin.role
    ],
    path: '/dashboard/catalogo',
    title: 'CATÁLOGOS',
    type: 'sub',
    icontype: 'fa fa-files-o',
    collapse: 'tables',
    isCollapsed: false,
    children: [
      // {path: 'usuario', title: 'USUARIOS', ab: 'US'},
      { path: 'centro-penitenciario', title: 'CENTROS PENITENCIARIOS', ab: 'CP' },
      { path: 'delito', title: 'DELITOS', ab: 'DE' },
      { path: 'tipo-libertad', title: 'TIPO DE LIBERTAD', ab: 'TL' },
      { path: 'clasificacion-juridica', title: 'CLASIFICACIÓN JURÍDICA', ab: 'CJ' },
      { path: 'enfermedad-cronica', title: 'ENFERMEDAD CRÓNICA', ab: 'EC' },
      { path: 'motivo-reubicacion', title: 'MOTIVO DE REUBICACIÓN', ab: 'MR' },
    ]
  },
  {
    roles: [
      r.admin.role
    ],
    path: '/dashboard/catalogo/usuario',
    title: 'USUARIOS',
    type: 'link',
    icontype: 'fa fa-user',
    collapse: 'tables',
    isCollapsed: false,
  },
  {
    roles: [
      r.test.role,
      r.dactiloscopia.role,
    ],
    path: '/dashboard',
    title: 'DACTILOSCOPÍA',
    type: 'sub',
    icontype: 'fa fa-sign-in',
    collapse: 'tables',
    children: [
      { path: 'ingreso/lista-ingreso', title: 'INGRESO', ab: 'IN' },
      { path: 'ingreso/busqueda-huella', title: 'BÚSQUEDA HUELLAS', ab: 'BH' },
      // Bitacoras Ingreso
      { path: 'bitacoras/ingreso', title: 'BITÁCORA INGRESO', ab: 'BI' },
      { path: 'bitacoras/ingreso-liberacion', title: 'BITÁCORA LIB. INGRESO', ab: 'LIN' },
      // Bitacoras Imputado
      { path: 'bitacoras/ingreso-Imputado', title: 'BITÁCORA IN. IMPUTADO', ab: 'BINI' },
      { path: 'bitacoras/ingreso-imputado-liberacion', title: 'BITÁCORA LIB. IMPUTADO', ab: 'LI' },
    ],
  },
  {
    roles: [
      r.test.role,
      r.trabajoSocial.role
    ],
    path: '/dashboard',
    title: 'TRABAJO SOCIAL',
    type: 'sub',
    icontype: 'fa fa-group',
    collapse: 'tables',
    children: [
      { path: '/ingreso', title: 'INGRESO', ab: 'IN' },
      { path: 'servicio-social/ficha-ingreso', title: 'FICHA DE INGRESO', ab: 'FI' },
      { path: 'servicio-social/estudio-trabajo-social', title: 'ESTUDIO DE CLASIFICACIÓN', ab: 'EC' },
      { path: 'servicio-social/seguimiento', title: 'FORMATO DE AVANCE Y/O INFORME', ab: 'FAI' },
      { path: 'servicio-social/nucleo-familiar', title: 'ESTUDIO FEDERAL', ab: 'EF' },
      { path: 'servicio-social/beneficio-estatal', title: 'BENEFICIO ESTATAL', ab: 'BE' },
      { path: 'servicio-social/traslado-federal', title: 'TRASLADO FEDERAL', ab: 'TF' },
      { path: 'servicio-social/estudio-socioeconomico', title: 'ESTUDIO SOCIOECONÓMICO', ab: 'ES' },
      // No se han definido
      // { path: 'comite-tecnico/plan-actividades', title: 'FORMATO DE PLAN DE ACTIVIDADES', ab: 'FPA' },
      // { path: 'servicio-social/registro-visita', title: 'REGISTRO VISITAS', ab: 'RV' },
    ],
  },
  {
    roles: [
      r.test.role,
      r.juridico.role,
    ],
    path: '/dashboard',
    title: 'Archivo juridico',
    type: 'sub',
    icontype: 'fa fa-table',
    collapse: 'tables',
    children: [
      { path: 'busqueda-ingreso', title: 'Busqueda ingreso', ab: 'BI' },
    ],
  },
  {
    roles: [
      r.comiteTecnico.role,
      r.test.role,
    ],
    path: '/dashboard',
    title: 'Plan de actividades',
    type: 'sub',
    icontype: 'fa fa-folder',
    collapse: 'tables',
    children: [
      { path: 'comite-tecnico/direccion-industrial', title: 'Dirección industrial', ab: 'DI' },
      { path: 'comite-tecnico/plan-actividades', title: 'Pedagogía', ab: 'PE' },
      { path: 'comite-tecnico/psicologia', title: 'Psicología', ab: 'PS' },
      { path: 'comite-tecnico/invitacion-actividad', title: 'Invitación de actividad ', ab: 'IA' },
      { path: 'comite-tecnico/deportes', title: 'Deportes', ab: 'DE' },
      { path: 'comite-tecnico/odontologia', title: 'Odontología', ab: 'OD' },
      { path: 'comite-tecnico/centro-escolar', title: 'Centro Escolar', ab: 'CE' },
      { path: 'comite-tecnico/trabajo-social', title: 'Trabajo social', ab: 'TS' },


    ],
  },
  {
    roles: [
      r.seguridadCustodia.role,
    ],
    path: '/dashboard',
    title: 'Seg. y Custodia',
    type: 'sub',
    icontype: 'fa fa-folder',
    collapse: 'tables',
    children: [
      { path: 'seguridad-custodia/capacitaciones', title: 'Capacitaciones', ab: 'CAP' },
      { path: 'seguridad-custodia/nombramiento', title: 'Nombramiento', ab: 'NOM' },
      { path: 'seguridad-custodia/custodios', title: 'Custodios', ab: 'CUS' },
      { path: 'seguridad-custodia/revisiones', title: 'Revisiones', ab: 'RE' },

    ],
  },
  {
    roles: [
      r.comiteTecnico.role,
      r.test.role,
    ],
    path: '/dashboard',
    title: 'Reportes',
    type: 'sub',
    icontype: 'fa fa-file',
    collapse: 'tables',
    children: [
      { path: 'comite-tecnico/examenes', title: 'Resultado examenes', ab: 'RE' },
      { path: 'comite-tecnico/reporte-medico', title: 'Médico', ab: 'ME' },
    ],
  },
  {
    roles: [
      r.test.role,
      r.site.role,
    ],
    path: '/dashboard',
    title: 'SITE',
    type: 'sub',
    icontype: 'fa fa-laptop',
    collapse: 'tables',
    isCollapsed: false,
    children: [
      { path: '/ingreso', title: 'INGRESO', ab: 'IN' },
      { path: '/informatica/personas-visitan', title: 'REPORTE VISITAS', ab: 'RV' },
    ]
  },
  {
    roles: [
      r.informatica.role,
    ],
    path: '/dashboard',
    title: 'INFORMÁTICA',
    type: 'sub',
    icontype: 'fa fa-laptop',
    collapse: 'tables',
    isCollapsed: false,
    children: [
      { path: '/ingreso', title: 'LISTA DE INGRESO', ab: 'IN' },
      { path: '/informatica/personas-visitan', title: 'BÚSQUEDA', ab: 'RV' },
      { path: '/informatica/restriccion-visitas', title: 'RESTRICCIÓN DE VISITAS', ab: 'RNV' },

    ]
  },

  {
    roles: [
      r.seguridadIngreso.role,
    ],
    path: '/dashboard',
    title: 'Seg. Ingreso',
    type: 'sub',
    icontype: 'fa fa-folder',
    collapse: 'tables',
    children: [
      { path: 'seguridad-custodia/registro-visitas', title: 'Registro de visitas', ab: 'RV' },

    ],
  },
];

export interface RouteInfo {
  roles: string[];
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

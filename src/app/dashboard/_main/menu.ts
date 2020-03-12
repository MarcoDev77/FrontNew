import {roles as r} from '../../shared/helpers/roles';

export const ROUTES: RouteInfo[] = [
  // {
  //   roles: [
  //     r.test.role,
  //     r.admin.role,
  //   ],
  //   path: '/dashboard',
  //   title: 'INGRESOS',
  //   type: 'sub',
  //   icontype: 'fa fa-arrow-circle-o-right',
  //   collapse: 'tables',
  //   isCollapsed: true,
  //   children: [
  //     { path: 'ingreso', title: 'Formulario de ingreso', ab: 'FI' },
  //     /* { path: 'datosAnexos', title: 'Señas particulares', ab: 'SP' }, */
  //     { path: 'mediafiliacion', title: 'Características', ab: 'MF' },
  //     { path: 'dactiloscopia', title: 'Dactiloscopia', ab: 'DP' },
  //   ]
  // },
  // {
  //   roles: [
  //     r.consultor.role
  //   ],
  //   path: '/dashboard/denuncia',
  //   title: 'JURIDICO',
  //   type: 'sub',
  //   icontype: 'now-ui-icons ui-1_zoom-bold',
  //   collapse: 'tables',
  //   isCollapsed: true,
  //   children: [
  //     { path: 'nuevas', title: 'FORMATOS', ab: 'FM' },
  //   ]
  // },
  // {
  //   roles: [
  //     r.admin.role
  //   ],
  //   path: '/dashboard/expediente',
  //   title: 'SERVICIO SOCIAL',
  //   type: 'link',
  //   icontype: 'now-ui-icons files_box'
  // },
  {
    roles: [
      r.test.role,
      r.site.role,
      r.superadmin.role
    ],
    path: '/dashboard/catalogo',
    title: 'CATÁLOGOS',
    type: 'sub',
    icontype: 'fa fa-files-o',
    collapse: 'tables',
    isCollapsed: false,
    children: [
      // {path: 'usuario', title: 'USUARIOS', ab: 'US'},
      {path: 'centro-penitenciario', title: 'CENTROS PENITENCIARIOS', ab: 'CP'},
      {path: 'delito', title: 'DELITOS', ab: 'DE'},
      {path: 'tipo-libertad', title: 'TIPO DE LIBERTAD', ab: 'TL'},
      {path: 'clasificacion-juridica', title: 'CLASIFICACIÓN JURÍDICA', ab: 'CJ'},
      {path: 'enfermedad-cronica', title: 'ENFERMEDAD CRÓNICA', ab: 'EC'},
      {path: 'motivo-reubicacion', title: 'MOTIVO DE REUBICACIÓN', ab: 'MR'},
    ]
  },
  {
    roles: [
      r.admin.role
    ],
    path: '/dashboard/catalogo/usuario',
    title : 'USUARIOS',
    type: 'link',
    icontype : 'fa fa-user',
    collapse : 'tables',
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
      {path: 'ingreso/lista-ingreso', title: 'INGRESO', ab: 'IN'},
      {path: 'ingreso/busqueda-huella', title: 'BUSQUEDA HUELLAS', ab: 'BH'},
      {path: 'bitacoras/ingreso-Imputado', title: 'BITACORA IN. IMPUTADO', ab: 'BINI'},
      {path: 'bitacoras/ingreso-imputado-liberacion', title: 'BITACORA LIB. IMPUTADO', ab: 'LI'},
      {path: 'bitacoras/ingreso', title: 'BITACORA INGRESO', ab: 'BI'},
      {path: 'bitacoras/ingreso-liberacion', title: 'BITACORA LIB. INGRESO', ab: 'LIN'},
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
      {path: 'servicio-social/pase-mensual', title: 'PASE MENSUAL', ab: 'PM'},
      {path: 'servicio-social/pase-unico', title: 'PASE UNICO', ab: 'PU'},
      {path: 'servicio-social/registro-visita', title: 'REGISTRO DE VISITA', ab: 'RV  '},

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
    icontype: 'fa fa-folder',
    collapse: 'tables',
    children: [
      {path: 'archivo/archivo', title: 'ARCHIVO', ab: 'AR'},
    ],
  }
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

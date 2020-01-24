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
      r.test.role
    ],
    path: '/dashboard/catalogo',
    title: 'CATALOGOS',
    type: 'sub',
    icontype: 'fa fa-files-o',
    collapse: 'tables',
    isCollapsed: true,
    children: [
      {path: 'centro-penitenciario', title: 'CENTROS PENITENCIARIOS', ab: 'CP'},
      {path: 'modalidad-delito', title: 'MODALIDAD DE DELITO', ab: 'MD'},
      {path: 'delito', title: 'DELITOS', ab: 'DE'},
      {path: 'tipo-libertad', title: 'TIPO DE LIBERTAD', ab: 'TL'},
      {path: 'clasificacion-juridica', title: 'CLASIFICACIÓN JURÍDICA', ab: 'CJ'},
      {path: 'enfermedad-cronica', title: 'ENFERMEDAD CRÓNICA', ab: 'EC'},
      {path: 'motivo-reubicacion', title: 'MOTIVO DE REUBICACIÓN', ab: 'MR'},
    ]
  },
  {
    roles: [
      r.test.role
    ],
    path: '/dashboard',
    title: 'DACTILOSCAPIA',
    type: 'sub',
    icontype: 'fa fa-sign-in',
    collapse: 'tables',
    children: [
      {path: 'ingreso/lista-ingreso', title: 'INGRESO', ab: 'IN'},
      {path: 'bitacoras/ingreso-imputado-liberacion', title: 'BITACORA LIB. IMPUTADO', ab: 'LI'},
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

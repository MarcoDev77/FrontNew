export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'INGRESOS',
    type: 'sub',
    icontype: 'fa fa-arrow-circle-o-right',
    collapse: 'tables',
    isCollapsed: true,
    children: [
      { path: 'ingreso', title: 'Formulario de ingreso', ab: 'FI' },
      { path: 'datosAnexos', title: 'Señas particulares', ab: 'SP' },
      { path: 'mediafiliacion', title: 'Características', ab: 'MF' },
      { path: 'dactiloscopia', title: 'Dactiloscopia', ab: 'DP' },
    ]
  },
  {
    path: '/dashboard/denuncia',
    title: 'JURIDICO',
    type: 'sub',
    icontype: 'now-ui-icons ui-1_zoom-bold',
    collapse: 'tables',
    isCollapsed: true,
    children: [
      { path: 'nuevas', title: 'FORMATOS', ab: 'FM' },
    ]
  },
  {
    path: '/dashboard/expediente',
    title: 'SERVICIO SOCIAL',
    type: 'link',
    icontype: 'now-ui-icons files_box'
  },
];

export interface RouteInfo {
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

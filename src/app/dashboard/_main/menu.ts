export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'INGRESOS',
    type: 'sub',
    icontype: 'fa fa-arrow-circle-o-right',
    collapse: 'tables',
    isCollapsed: true,
    children: [
      { path: 'mediafiliacion', title: 'Características', ab: 'MF' },
    ]
  },
  {
    path: '/dashboard/dactiloscopia',
    title: 'DACTILOSCOPIAS',
    type: 'link',
    icontype: ''
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

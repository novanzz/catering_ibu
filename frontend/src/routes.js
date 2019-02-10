import React from 'react'
import Loadable from 'react-loadable'

function Loading() {
  return <div>Loading...</div>;
}

const OrderPembeli = Loadable({
  loader: () => import('./features/dash-order/index'),
  loading: Loading,
});

const Menu = Loadable({
  loader: () => import('./features/dash-menu/index'),
  loading: Loading,
});

const routes = [
  { path: '/Menu', name: 'Menu', component: Menu },
  { path: '/Orderpembeli', name: 'Orderan', component: OrderPembeli },

];

export default routes;

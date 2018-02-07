import './style.less';
import Home from './home';
import Settings from './settings';
import Drag from './drag';

const routes = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/settings', component: Settings },
  { exact: true, path: '/drag', component: Drag },
];

export default routes;

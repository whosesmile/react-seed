import './style.less';
import Home from './home';
import Settings from './settings';

const routes = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/settings', component: Settings },
];

export default routes;

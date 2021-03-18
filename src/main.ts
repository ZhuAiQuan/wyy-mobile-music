import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import './index.less';
import { Lazyload } from 'vant';

createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .use(Lazyload)
  .mount('#app');

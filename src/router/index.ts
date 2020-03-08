import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Chart from '@/views/Chart.vue';
import Notfound from '@/views/Notfound.vue';
import EditLabel from '@/views/EditLabel.vue';
import DiscoverMore from '@/views/DiscoverMore.vue';
import UserInfo from '@/views/UserInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/chart',
    component: Chart,
  },
  {
    path: '/editLabel',
    component: EditLabel
  }, {
    path: '/discoverMore',
    component: DiscoverMore
  }, {
    path: '/userInfo',
    component: UserInfo
  },
  {
    path: '*',
    component: Notfound
  },

];

const router = new VueRouter({
  routes
});

export default router;

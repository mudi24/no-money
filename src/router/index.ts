import Vue from 'vue';
import VueRouter from 'vue-router';
import Money from '@/views/Money.vue';
import Home from '@/views/Home.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
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
    path: '/labels',
    component: Labels,
  },
  {
    path: '/statistics',
    component: Statistics
  }, {
    path: '/labels/edit/:id',
    component: EditLabel
  }, {
    path: '/DiscoverMore',
    component: DiscoverMore
  }, {
    path: '/UserInfo',
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

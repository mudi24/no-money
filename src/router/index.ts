import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Chart from '@/views/Chart.vue';
import Notfound from '@/views/Notfound.vue';
import EditLabel from '@/views/EditLabel.vue';
import Discover from '@/views/Discover.vue';
import User from '@/views/User.vue';
import UserInfo from "@/components/User/UserInfo.vue";
import UserMessage from "@/components/User/UserMessage.vue";
import Version from "@/components/User/Version.vue";


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
    path: '/discover',
    component: Discover
  }, {
    path: '/user',
    component: User,
  }, {
    path: '/userInfo',
    component: UserInfo,
  },
  {
    path: '/message',
    component: UserMessage,
  },
  {
    path: '/version',
    component: Version
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

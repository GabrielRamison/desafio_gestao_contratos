import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import CreateContract from '@/views/CreateContract.vue';
import EditContract from '@/views/EditContract.vue';
import ContractDetails from '@/views/ContractDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreateContract',
    component: CreateContract
  },
  {
    path: '/edit/:id',
    name: 'EditContract',
    component: EditContract,
    props: true
  },
  {
    path: '/details/:id',
    name: 'ContractDetails',
    component: ContractDetails,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../pages/HomePage.vue');
const Search = () => import('../pages/SearchPage.vue');
const Detail = () => import('../pages/WeatherDetailPage.vue');
const EditProfile = () => import('../pages/EditProfilePage.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'Search', component: Search },
  { path: '/detail', name: 'Detail', component: Detail },      // pass lat/lon via query
  { path: '/profile/edit', name: 'EditProfile', component: EditProfile },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;

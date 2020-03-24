import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path:      '/',
        name:      'stripe-overview',
        alias:     '/strips',
        component: () => import('./../views/StripesOverView'),
    },
    {
        path:      '/strips/:stripeId',
        name:      'stripe-detail-view',
        component: () => import('./../views/StripeDetailView'),
    },
    {
        path:      '/control',
        name:      'led-control',
        component: () => import('./../views/LedControl'),
    },
    {
        path:      '/settings',
        name:      'app-settings',
        component: () => import('./../views/AppSettings'),
    },
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes,
});

export default router;

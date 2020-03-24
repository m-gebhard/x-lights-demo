// 3rd
import Vue           from 'vue';
import App           from './App.vue';
import router        from './router';
import store         from './store';
import Vue2Filters   from 'vue2-filters';
import Notifications from 'vue-notification';
import validator     from './utils/validator';

// font-awesome
import { library }         from '@fortawesome/fontawesome-svg-core';
import { fas }             from '@fortawesome/free-solid-svg-icons';
import { fab }             from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);
library.add(fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('validation-provider', validator.ValidationProvider);
Vue.component('validation-observer', validator.ValidationObserver);

// scss
import './assets/scss/app.scss';

// lang
import i18n from './lang/lang';

// utils
import OutsideClick from './utils/outsideClick';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Vue2Filters);
Vue.use(Notifications);

Vue.directive('outside-click', OutsideClick);

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app');

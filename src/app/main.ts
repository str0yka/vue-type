import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { App } from './providers';
import { router } from './router';
import './styles/colors.css';
import './styles/global.css';
import './styles/reset.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

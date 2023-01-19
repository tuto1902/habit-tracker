import './bootstrap';
import { createPinia } from 'pinia'
import { createApp } from 'vue/dist/vue.esm-bundler';
import Habits from './components/Habits.vue'

import Alpine from 'alpinejs';
window.Alpine = Alpine;

const pinia = createPinia()

Alpine.start();

createApp({
    components: {
        'habits': Habits
    }
}).use(pinia).mount('#app');
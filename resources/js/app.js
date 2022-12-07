import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler';
import HabitInfo from './components/HabitInfo.vue';
import ExecuteButton from './components/ExecuteButton.vue';
import ProgressBar from './components/ProgressBar.vue';

import Alpine from 'alpinejs';
window.Alpine = Alpine;

Alpine.start();

createApp({
    components: {
        'habit-info': HabitInfo,
        'execute-button': ExecuteButton,
        'progress-bar': ProgressBar
    }
}).mount('#app');
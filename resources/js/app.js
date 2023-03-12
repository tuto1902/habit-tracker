import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler'
import Habits from './components/Habits.vue'
import { createPinia } from 'pinia'
import HabitDialog from './components/HabitDialog.vue'
import NewHabitButton from './components/NewHabitButton.vue'

import Alpine from 'alpinejs';
window.Alpine = Alpine;

const pinia = createPinia()

Alpine.start();

createApp({
    components: {
        'habits': Habits,
        'habit-dialog': HabitDialog,
        'new-habit-button': NewHabitButton
    }
}).use(pinia).mount('#app');
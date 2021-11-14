// Importing vue js resources.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Importing external resources.
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Importing CSS resources.
import './styles/Main.css';
import './styles/Forms.css';
import './styles/Table.css';


const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

createApp(App)
    .use(store)
    .use(router)
    .use(VueSweetalert2, options)
    .mount('#app')

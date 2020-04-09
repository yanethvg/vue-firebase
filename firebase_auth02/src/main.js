import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue'
import router from './router'
import store from './store'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


var firebase = require("firebase/app");

//Add additional
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBNbvYTCYct7B_722XB4scNCCvCAt1pZyE",
  authDomain: "crud-task01-vue.firebaseapp.com",
  databaseURL: "https://crud-task01-vue.firebaseio.com",
  projectId: "crud-task01-vue",
  storageBucket: "crud-task01-vue.appspot.com",
  messagingSenderId: "97313178049",
  appId: "1:97313178049:web:51a18d7d01579592762f40",
  measurementId: "G-1YGCXQLXHW"
};
// Initialize Firebase esto era solo para el login
//firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) =>  {
  //console.log(user);
  if (user) {
    // User is signed in.
    store.dispatch('detectarUsuario',{ email: user.email, uid: user.uid})
    // ...
  } else {
    // User is signed out.
    store.dispatch('detectarUsuario',null)
    // ...
  }
  // para que espere que se rescate la información del usuario
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});



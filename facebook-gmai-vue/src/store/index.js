import Vue from 'vue'
import Vuex from 'vuex'
import { auth, firebase } from '@/firebase'
import router from "@/router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {}
  },
  mutations: {
    nuevoUsuario(state,payload){
      state.usuario = payload;
    }
  },
  actions: {
    setUsuario({commit},user){
      const usuario = {
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        foto: user.foto
      }
      commit('nuevoUsuario',usuario)
      router.push({name: 'Home'});
      //console.log(usuario);
    },
    cerrarSesion({commit}){
      
      firebase.auth().signOut();
      commit('nuevoUsuario',null);
      router.push({name: 'Ingreso'});
    }
  },
  modules: {
  }
})

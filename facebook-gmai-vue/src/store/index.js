import Vue from 'vue'
import Vuex from 'vuex'
import { auth, firebase,db } from '@/firebase'
import router from "@/router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: ''
  },
  mutations: {
    nuevoUsuario(state,payload){
      
      if(payload === null){
        state.usuario = ''
      }else{
        state.usuario = payload;
      }
    }
  },
  actions: {
    async setUsuario({commit},user){
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if(doc.exists){
          commit('nuevoUsuario',doc.data())
          router.push({name: 'Home'});
        }else{
         //guardar en firestore
          await db.collection('usuarios').doc(user.uid).set(user);
          console.log('usuario guardado en db');
          commit('nuevoUsuario',user)
          router.push({name: 'Home'});
        }
       
      } catch (error) {
        console.log(error);
      }
     
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

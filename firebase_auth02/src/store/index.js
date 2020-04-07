import Vue from 'vue'
import Vuex from 'vuex'
var firebase = require("firebase/app");
import router from '@/router'
import db from '@/main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    tarea:{ nombre: '', id: ''}
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload
    },
    setError(state,payload){
      state.error = payload
    },
    setTareas(state,tareas){
      state.tareas = tareas
    },
    setTarea(state,tarea){
      state.tarea = tarea
    },
    //mutacion para eliminar la tarea borrada
    eliminarTarea(state,id){
      state.tareas = state.tareas.filter( doc => {
        return doc.id != id
      })
    }
  },
  actions: {
    crearUsuario({commit},payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        //console.log(res.user.email);
        //console.log(res.user.uid);
        commit('setUsuario',{email: res.user.email, uid: res.user.uid});
          //Crear una collecion con el email del usuario
          db.collection(res.user.email).add({
            nombre: 'Tarea de Ejemplo'
          })
          .then(() => {
            //redireccionar
            router.push({name: 'Inicio'});
          });

      }).catch(err => {
        console.log(err.message);
        commit('setError',err.message);
      })
    },
    ingresoUsuario({commit},payload){
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(res=> {
        //console.log(res);
        commit('setUsuario',{email: res.user.email, uid: res.user.uid});
        router.push({name: 'Inicio'});
      }).catch(err => {
        console.log(err.message);
        commit('setError',err.message);
      })
    },
    detectarUsuario({commit},payload){
      if(payload != null){
        commit('setUsuario',{email: payload.email, uid: payload.uid});
      }else{
        commit('setUsuario',null);
      }
    },
    cerrarSesion({commit}){
      firebase.auth().signOut();
      commit('setUsuario',null)
      router.push({name: 'Login'});
    },
    //acciones exclusivamente de crud de tareas
    getTareas({commit}){
      const tareas = []
      // poder sacar el usuario actual tiene el uid y el email
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data());
            let tarea = doc.data();
            tarea.id = doc.id;
            tareas.push(tarea);
        });
      });
      //estamos mandando a la mutación de set tareas 
      commit('setTareas',tareas);
    },
    getTarea({commit},id){
      let tarea='';
      // poder sacar el usuario actual tiene el uid y el email
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).get()
          .then(doc => {
            //console.log(doc.data());
            tarea = doc.data();
            tarea.id = doc.id;
            //aca adentro porque solo es un dato
            commit('setTarea',tarea)
          })
    },
    editarTarea({commit},tarea){
      // poder sacar el usuario actual tiene el uid y el email
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push({name: 'Inicio'})
      })
    },
    agregarTarea ({commit},nombre){
      // poder sacar el usuario actual tiene el uid y el email
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).add({
        nombre: nombre
      })
      .then(doc => {
        console.log(doc.id);
        router.push({name: 'Inicio'})
      })
    },
    eliminarTarea({commit,dispatch},id){
      // poder sacar el usuario actual tiene el uid y el email
      const usuario = firebase.auth().currentUser;
      db.collection(usuario.email).doc(id).delete()
      .then(() => {
        console.log('Tarea eliminada');
        //dispatch('getTareas'); no es muy elegante porque se recarga la pagina
        commit('eliminarTarea',id);
      })
    }
  },
  modules: {
  },
  getters:{
    existeUsuario(state){
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined){
        return false
      }else{
        return true
      }

    }
  }
})

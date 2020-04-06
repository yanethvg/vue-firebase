import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import db from '@/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea:{ nombre: '', id: ''}
  },
  mutations: {
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
    // se debe poner el commit para que pueda modificar mutations
    getTareas({commit}){
      const tareas = []
      db.collection("tareas").get().then(function(snapshot) {
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
      db.collection("tareas").doc(id).get()
          .then(doc => {
            //console.log(doc.data());
            tarea = doc.data();
            tarea.id = doc.id;
            //aca adentro porque solo es un dato
            commit('setTarea',tarea)
          })
    },
    editarTarea({commit},tarea){
      db.collection("tareas").doc(tarea.id).update({
        nombre: tarea.nombre
      })
      .then(() => {
        router.push({name: 'Inicio'})
      })
    },
    agregarTarea ({commit},nombre){
      db.collection("tareas").add({
        nombre: nombre
      })
      .then(doc => {
        console.log(doc.id);
        router.push({name: 'Inicio'})
      })
    },
    eliminarTarea({commit,dispatch},id){
      db.collection("tareas").doc(id).delete()
      .then(() => {
        console.log('Tarea eliminada');
        //dispatch('getTareas'); no es muy elegante porque se recarga la pagina
        commit('eliminarTarea',id);
      })
    }

  },
  modules: {
  }
})

<template>
  <div id="app" class="container mt-5">
    <div id="nav" class="row" >
      <router-link :to="{ name: 'Registro'}" v-if="!existeUsuario" class="btn btn-primary mx-2">Registro</router-link> |
      <router-link :to="{ name: 'Inicio'}" v-if="existeUsuario" class="btn btn-primary mx-2">Inicio</router-link> |
      <router-link :to="{ name: 'Login'}" v-if="!existeUsuario" class="btn btn-primary mx-2">Ingreso</router-link> |
      <a @click="cerrarSesion()" v-if="existeUsuario" class="btn btn-danger mx-2">Cerrar Sesión</a>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    name: 'App',
    methods:{
        ...mapActions(['cerrarSesion'])
    },
    computed: {
      ...mapGetters(['existeUsuario'])
    }
}
</script>
<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}*/
</style>

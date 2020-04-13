<template>
  <v-layout>
    <h3>Bienvenido usuario: {{usuario.nombre}}</h3>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: 'Home',
  computed:{
    ...mapState(['usuario'])
  }
}
</script>

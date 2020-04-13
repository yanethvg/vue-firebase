<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
          <v-btn  to="/">VUE</v-btn>
      
      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion">
        <span class="mr-2" >Cerrar sesión</span>
        <v-icon>fas fa-times-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  methods:{
    ...mapActions(['cerrarSesion']) 
  }
};
</script>

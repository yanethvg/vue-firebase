<template>
    <nav>
        <v-toolbar dense>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <router-link :to="{name: 'Home'}">
                 <v-toolbar-title>VUE</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn icon @click="cerrarSesion">
                <v-icon>fas fa-door-open</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
            class="deep-purple accent-4"
            dark
            v-model="drawer"
            absolute
            temporary
            dense
        >
        <v-container > 
            <v-row class="d-flex mt-5 justify-center column">
                <v-col>
                    <v-avatar>
                        <img
                            :src="usuario.foto"
                            alt="John"
                        >
                    </v-avatar>
                </v-col>
                
            </v-row>
            <v-row class="d-flex  mt-5 justify-center column ">
               <v-col>
                     <p class="mt-3 white--text">{{usuario.nombre}}</p>
                </v-col>
            </v-row>
        </v-container>
        <v-divider></v-divider>
       <v-list>
            <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import { mapActions,mapState } from "vuex";
export default {
  name: 'Home',
  data(){
      return{
          drawer: false,
           items: [
                    { title: 'Perfil', icon: 'fa-user-check', to: {name: 'Home'} },
                    { title: 'Fotografia', icon: 'fa-image',to: {name: 'Ingreso'} },
                    { title: 'Admin', icon: 'fas fa-user-shield',to: {name: 'Admin'} },
            ],
      }
  },
  methods:{
    ...mapActions(['cerrarSesion']) 
  },
  computed: {
      ...mapState(['usuario'])
  }
};
</script>
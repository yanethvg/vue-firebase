<template>
    <v-layout class="mt-4">
        <v-row class="justify-center">
            <v-col cols="12" sm="8" md="6" xl="4">
                <v-card>
                    <v-card-text class="display-1 text-uppercase  white--text text-sm-center" :class="registro ? 'success': 'accent'">
                        <span v-if="!registro">Ingreso</span>
                        <span  v-if="registro">Registro</span>
                    </v-card-text>
                    <v-card-text>
                        <v-btn block color="error" @click="google">
                            <v-icon left dark>fab fa-google</v-icon>  Google
                        </v-btn>
                        <v-btn block color="info" class="mt-2" @click="facebook">
                            <v-icon left dark>fab fa-facebook-f</v-icon>  Facebook
                        </v-btn>
                    </v-card-text>
                    <v-card-text>
                        <v-btn block @click="registro = true" v-if="!registro">¿No tienes cuenta? Registrate aquí </v-btn>
                         <v-btn block @click="registro = false" v-if="registro">¿Ya tienes cuenta? Ingresa aquí </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
import { firebase,auth, db } from "@/firebase";
import { mapMutations,mapActions } from "vuex";

export default {
    data(){
        return{
            registro: false
        }
    },
    methods:{
        ...mapMutations(['nuevoUsuario']),
        ...mapActions(['setUsuario']),
        facebook(){
            const provider = new firebase.auth.FacebookAuthProvider();
            this.ingresar(provider);
        },
        google(){
            const provider = new firebase.auth.GoogleAuthProvider();
            this.ingresar(provider);
        },
        async ingresar(provider){
            //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            firebase.auth().languageCode = 'es';
            try{
                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;
                 const usuario = {
                    nombre: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    foto: user.photoURL
                }
                this.setUsuario(usuario);
                
            }catch(error){
                console.log(error)
            }
        },
        

    }
}
</script>
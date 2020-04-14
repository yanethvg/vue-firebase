<template>
    <v-container>
        <v-row class="d-flex align-center justify-center" md="6">
            <v-card >
                <v-card-text class="text-center">
                     <v-avatar>
                        <img
                            :src="usuario.foto"
                            :alt="usuario.nombre"
                        >
                    </v-avatar>
                </v-card-text>
                <v-card-text class="text-center">
                    <h3>{{usuario.nombre}}</h3>
                </v-card-text>
                <v-card-text class="d-none" @change="buscarImagen($event)">
                     <input type="file" ref="boton">
                </v-card-text>
                <v-card-text>
                    <v-btn color="primary mr-2" @click="$refs.boton.click()">Buscar Imagen</v-btn>
                    <v-btn color="secondary" :disabled="file === null " @click="subirImagen()" :loading="loading">Subir Imagen</v-btn>
                </v-card-text>
                <v-card-text v-if="error">
                    <h4>{{error}}</h4>
                </v-card-text>
                <v-card-text v-if="file" class="text-center">
                    <h4>{{file.name}}</h4>
                    <v-img :src="urlTemporal"></v-img>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
import { mapActions,mapState } from "vuex";
import { storage,db } from '@/firebase';

export default {
    name: 'Admin',
    data(){
        return{
            file: null,
            urlTemporal: '',
            loading: false,
            error: null
        }
    },
    computed: {
      ...mapState(['usuario'])
    },
    methods:{
        buscarImagen(event){
            const tipoArchivo = event.target.files[0].type;
            if(tipoArchivo === "image/jpeg" || tipoArchivo === "image/png" ){
                this.file = event.target.files[0];
                 this.error = null;
            }else{
                this.error = 'Archivo no valido';
                this.file= null
                return 
            }
            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) => {
                //console.log(e.target.result);
                this.urlTemporal = e.target.result;
            }
        },
        async subirImagen(){
            try{
                this.loading = true;
                const refImagen = storage.ref().child(this.usuario.email).child('foto perfil');
                const res = await refImagen.put(this.file);
                const urlDescarga = await refImagen.getDownloadURL();
                this.usuario.foto = urlDescarga;

                await db.collection('usuarios').doc(this.usuario.uid).update({
                    foto: urlDescarga
                });
                this.error = 'Imagen subida con exito';
                this.file=null
            }catch(e){
                console.log(e)
            }finally{
                this.loading = false
            }
        }
    }
}
</script>
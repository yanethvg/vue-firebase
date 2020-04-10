<template>
<div>
    <h1>Editar Tarea</h1>
     {{id}} - {{tarea.nombre}}<br/>
     <div v-if="carga" class="text-center mt-5">
      <h3>Cargando contenido ...</h3>
      <pulse-loader :loading="carga" ></pulse-loader>
    </div>
    <form  @submit.prevent="editarTarea(tarea)" class="form-inline" v-if="!carga">
      <!-- <input type="text" v-model="nombre"> -->
      <!-- <button type="submit">Agregar</button> -->
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text">Nombre</div>
        </div>
        <input type="text" class="form-control" v-model.lazy="$v.tarea.nombre.$model" :class="{'is-invalid' : $v.tarea.nombre.$error}">
      </div>
      <button type="submit" class="btn btn-primary mb-2" :disabled="$v.tarea.$invalid || carga">Editar</button>
    </form>
    <small class="text-danger" v-if="!$v.tarea.nombre.minLength">Contraseña mayor de 6 Caracteres</small>
    <small class="text-danger" v-if="!$v.tarea.nombre.required">Campo Requerido</small>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { required,minLength } from 'vuelidate/lib/validators'

export default {
    name:'Editar',
    data(){
        return {
            id: this.$route.params.id
        }
    },
    components: {
      PulseLoader
    },
    validations: {
        tarea: {
          nombre:{
            required,
            minLength: minLength(6)
          }
        },
    },
    computed:{
        ...mapState(['tarea','carga'])
    },
    methods:{
        ...mapActions(['getTarea','editarTarea'])
    },
    created(){
        this.getTarea(this.id);
    }
}
</script>
<template>
    <div>
    <h1>Agregar</h1>
    <form @submit.prevent="agregarTarea(nombre)" class="form-inline">
      <!-- <input type="text" v-model="nombre"> -->
      <!-- <button type="submit">Agregar</button> -->
      <div class="input-group mb-2 mr-sm-2">
        <div class="input-group-prepend">
          <div class="input-group-text" >Nombre</div>
        </div>
        <input type="text" class="form-control" v-model.lazy="$v.nombre.$model" :class="{'is-invalid' : $v.nombre.$error}">
      </div>
      <button type="submit" class="btn btn-primary mb-2 d-block" :disabled="$v.$invalid || carga">Agregar</button>
    </form>
    <small class="text-danger" v-if="!$v.nombre.minLength">Contraseña mayor de 6 Caracteres</small>
    <small class="text-danger" v-if="!$v.nombre.required">Campo Requerido</small>
   
  </div>

</template>

<script>
import { mapActions,mapState } from 'vuex'
import { required,minLength } from 'vuelidate/lib/validators'
export default {
    name: 'Agregar',
    data(){
        return {
            nombre: ''
        }
    },
    validations: {
        nombre: {
            required,
            minLength: minLength(6)
        },
    },
    computed:{
      ...mapState(['carga'])
    },
    methods: {
        ...mapActions(['agregarTarea'])
    }
}
</script>
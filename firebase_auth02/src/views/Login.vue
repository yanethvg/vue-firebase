<template>
    <div>
        <h1>Ingreso de Usuario</h1>
        <form @submit.prevent="ingresoUsuario({email:email, password: pass})">
            <input type="email" v-model.lazy="$v.email.$model" placeholder="Ingresa un email" class="form-control my-3"
            :class="{'is-invalid' : $v.email.$error}">
            <p class="text-danger" v-if="!$v.email.email">Este email es incorrecto</p>
            <p class="text-danger" v-if="!$v.email.required">Campo Requerido</p>
            <input type="password" v-model.lazy="$v.pass.$model" placeholder="Ingrese su password" class="form-control my-3" :class="{'is-invalid' : $v.pass.$error}">
            <p class="text-danger" v-if="!$v.pass.minLength">Contraseña mayor de 6 Caracteres</p>
            <p class="text-danger" v-if="!$v.pass.required">Campo Requerido</p>
            <button type="submit" class="btn btn-info">Acceder</button>
        </form>
        {{error}}
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import { required, email,minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Login',
    data(){
        return{
            email: '',
            pass: ''
        }
    },
    validations: {
        email: {
            required,
            email
        },
        pass: {
            required,
            minLength: minLength(6)
        }
    },
    computed: {
        ...mapState(['error'])
    },
    methods:{
        ...mapActions(['ingresoUsuario'])
    }
}
</script>
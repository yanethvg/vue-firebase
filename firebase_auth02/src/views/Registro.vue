<template>
    <div>
        <h1>Registro</h1>
        <form @submit.prevent="crearUsuario({email: email, password:password})">
            <input type="email" v-model.lazy="$v.email.$model" placeholder="Ingresa un email" class="form-control my-3"
            :class="{'is-invalid' : $v.email.$error}">
            <p class="text-danger" v-if="!$v.email.email">Este email es incorrecto</p>
            <p class="text-danger" v-if="!$v.email.required">Campo Requerido</p>
            <input type="password" v-model.lazy="$v.password.$model" class="form-control my-3" placeholder="Ingrese su contraseña">
            <p class="text-danger" v-if="!$v.password.required">La contraseña es obligatoria</p>
            <p class="text-danger" v-if="!$v.password.minLength">Contraseña mayor de 6 Caracteres</p>
            <input type="password"  v-model.lazy="$v.repeatPassword.$model" class="form-control my-3" placeholder="Ingrese nuevamente su contraseña">
            <p class="text-danger" v-if="!$v.repeatPassword.sameAsPassword">No coinciden las contraseñas</p>
            <button type="submit" class="btn btn-success" :disabled="$v.$invalid">Crear Usuario</button>
        </form>
         <p v-if="error === 'auth/email-already-in-use'">
            Email ya Registrado
        </p>
    </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { required, email,sameAs, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Registro',
    data(){
        return{
            email:'',
            password: '',
            repeatPassword: ''
        }
    },
    validations: {
        email: {
            required,
            email
        },
         password: {
            required,
            minLength: minLength(6)
        },
            repeatPassword: {
            sameAsPassword: sameAs('password')
        }
    },
    computed:{
        ...mapState(['error']),
        desactivar(){
            return this.password === this.repeatPassword && this.password != '' && this.email != ''
        }
    },
    methods :{
        ...mapActions(['crearUsuario'])
    }
}
</script>
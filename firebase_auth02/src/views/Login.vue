<template>
    <div>
        <h1>Ingreso de Usuario</h1>
        <form @submit.prevent="ingresoUsuario({email: email, password: pass})">
            <input type="email" v-model="email">
            <input type="current-password" v-model="pass">
            <button type="submit">Acceder</button>
        </form>
        {{error}}
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
    name: 'Login',
    data(){
        return{
            email: '',
            pass: ''
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
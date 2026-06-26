<script setup>
  import { ref } from 'vue';
  import Login from './components/loguin.vue';
  import Navbar from './components/navbar.vue'
  import Resumen from './components/resumen.vue';
  import Recibos from './components/recibos.vue';
  import Formulario from './components/formulario.vue';
  import Usuario from './components/usuario.vue';
  const cerrarLogin = ref(localStorage.getItem('token') ? true : false);
  const vistaActual = ref('detalle');  
  const reciboSeleccionado = ref(null);
  const mesSeleccionado = ref(null);
  const datosToken = ref({
    nombre: null,
    cambiar_pass: null
  })

  const prepararEdicion = (recibo) => {
    reciboSeleccionado.value = recibo;
    vistaActual.value = 'nuevo';
  }

  const verDetalle = (mes) => {
    mesSeleccionado.value = mes;
    vistaActual.value ='detalle';
  }

  const logado = (cambiar_pass, nombre) => {
    datosToken.value.cambiar_pass = cambiar_pass;
    datosToken.value.nombre = nombre;
    cerrarLogin.value = true;

    if(cambiar_pass === 1){
      vistaActual.value = 'usuario';
    }else {
      vistaActual.value = 'detalle';
    }
  }

</script>

<template>
  <h1 class="titulo">Gestion de Cuentas del Hogar</h1>
  <Login @usuarioLogado="logado"  v-if="!cerrarLogin"/>
  <Resumen v-if="vistaActual === 'resumen' && cerrarLogin" @verDetalle="verDetalle"/>
  <Recibos v-if="vistaActual === 'detalle' && cerrarLogin" @modificarRecibo="prepararEdicion" :mesRecibido="mesSeleccionado"/>
  <Formulario v-if="vistaActual === 'nuevo' && cerrarLogin" @volverDetalle="vistaActual ='detalle'" :datosRecibo="reciboSeleccionado"/>
  <Usuario v-if="vistaActual === 'usuario' && cerrarLogin" />
  <Navbar
    v-if="cerrarLogin && datosToken.cambiar_pass !== 1"
    :vistaActual="vistaActual"
    @irResumen="vistaActual = 'resumen'"
    @irDetalle="vistaActual = 'detalle'; verDetalle(null)"
    @irNuevo="vistaActual = 'nuevo'; prepararEdicion(null)"
    @irUsuario="vistaActual = 'usuario'"
    @usuarioDeslogado="cerrarLogin=false" />
</template>

<style scoped>
  .titulo {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
</style>

<style>
  #app {
    padding-bottom: 100px;
  }
</style>

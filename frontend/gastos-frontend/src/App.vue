<script setup>
  import { ref } from 'vue';
  import Login from './components/loguin.vue';
  import Navbar from './components/navbar.vue'
  const cerrarLogin = ref(localStorage.getItem('token') ? true : false);
  const vistaActual = ref('resumen');  

</script>

<template>
  <h1 class="titulo">Gestion de Cuentas del Hogar</h1>
  <Login @usuarioLogado="cerrarLogin=true"  v-if="!cerrarLogin"/>
  <h2 v-if="vistaActual === 'resumen'">Resumen</h2>
  <h2 v-if="vistaActual === 'detalle'">Detalle</h2>
  <h2 v-if="vistaActual === 'nuevo'">Nuevo</h2>
  <h2 v-if="vistaActual === 'usuario'">Usuario</h2>
  <Navbar
    v-if="cerrarLogin"
    :vistaActual="vistaActual"
    @irResumen="vistaActual = 'resumen'"
    @irDetalle="vistaActual = 'detalle'"
    @irNuevo="vistaActual = 'nuevo'"
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

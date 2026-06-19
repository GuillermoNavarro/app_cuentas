<script setup>
  import { ref } from 'vue';
  import Login from './components/loguin.vue';
  import BtnDeslog from './components/botonDeslogue.vue'
  const cerrarLogin = ref(localStorage.getItem('token') ? true : false);
  

</script>

<template>
  <h1>Gestion de Cuentas del Hogar</h1>
  <BtnDeslog @usuarioDeslogado="cerrarLogin=false" v-if="cerrarLogin"/>
  <Login @usuarioLogado="cerrarLogin=true"  v-if="!cerrarLogin"/>
  <h2 v-else>Bieenvenido</h2>
</template>

<style scoped></style>

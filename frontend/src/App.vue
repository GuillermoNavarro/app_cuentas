<script setup>
  import { onMounted, ref, watch } from 'vue';
  import Login from './components/loguin.vue';
  import Navbar from './components/navbar.vue'
  import Resumen from './components/resumen.vue';
  import Recibos from './components/recibos.vue';
  import Formulario from './components/formulario.vue';
  import Usuario from './components/usuario.vue';
  import { useRegisterSW } from 'virtual:pwa-register/vue'
  const { needRefresh, updateServiceWorker } = useRegisterSW();
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
    

    if(cambiar_pass === 1){
      vistaActual.value = 'usuario';
    }else {
      vistaActual.value = 'detalle';
    }

    cerrarLogin.value = true;
  }

  const actualizarSW = async () => {
    const confirmacion = window.confirm("Nueva version disponible ¿Actualizar?");
    if(confirmacion){updateServiceWorker();}
  }

  const iniciarSesion = () => {
    const token = localStorage.getItem('token');
    if(token){
      try{
          const payloadBase64 = token.split('.')[1];
          const payloadDecodificado = JSON.parse(atob(payloadBase64));
          datosToken.value.nombre = payloadDecodificado.nombre;
          datosToken.value.cambiar_pass = payloadDecodificado.cambiar_pass;
          cerrarLogin.value = true;
          if(payloadDecodificado.cambiar_pass === 1){
            vistaActual.value = 'usuario';
          }else{
          vistaActual.value = 'detalle';
          }
      }catch (err) {
          console.error("Error al decodificar el token", err)
          return null;
      }
    }
  }

  watch(needRefresh, (nuevoValor) => {
    if(nuevoValor){actualizarSW();}
  })

  onMounted(() => {
    iniciarSesion();
  })

</script>

<template>
  <header class="cabecera">
    <h1 class="titulo">Gestion de Cuentas</h1>
    <div v-if="cerrarLogin && datosToken.nombre" class="saludo_usuario">
      <span>Hola, {{ datosToken.nombre }}</span>
    </div>
  </header>
  

  <Login @usuarioLogado="iniciarSesion"  v-if="!cerrarLogin"/>
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
 .cabecera {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: env(safe-area-inset-top, 0px) 20px 10px 20px;
    border-bottom: 1px solid #ccc;
    
    background-color: white;
    z-index: 1000;
  }

  .titulo {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0;
  }

  .saludo_usuario {
    text-align: right;
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-family: Verdana, sans-serif;
    font-size: 0.85rem;
  }
</style>

<style>
  #app {
    padding-bottom: 100px;
    padding-top: 75px;
  }
</style>

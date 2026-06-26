<script setup>
    import { cambioPass } from '../servicios/usuarioService';
    import { ref, onMounted } from 'vue';

    const datos = ref({
        passAntigua: null,
        passNueva: null
    });

    const rePass =ref(null);

    const usuarios = ref(null);

    const pass = async () => {
        if(datos.value.pasNueva === rePass.value){
            const respuesta = await cambioPass(datos.value);
            if(respuesta){
                window.alert("Contraseña cambiada");
            }
        }else{
            window.alert("Las constraseñas no coinciden");
        }     
    }

    onMounted(async () => {
        usuarios.value = await cargarUsuarios();
    })

</script>

<template>
      <div class="lista_user">
        <h2>Usuarios en sus cuentas</h2>
        <div v-for="usuario in usuarios" :key="usuario.id_usuario" class="fila_user">
            <span>{{ usuario.nombre }}</span>
            <span>{{ usuario.email }}</span>
        </div>
      </div>
      <div class="cambio_pass">
        <h2>Cambio Contraseña</h2>
        <form @submit.prevent="pass()">
            <label for="oldPass">Constraseña Actual</label>
            <input id="oldPass" type="text" v-model="datos.passAntigua">
            <label for="newPass">Nueva Contraseña</label>
            <input id="newPass" type="text" v-model="datos.passNueva">
            <label for="rePass">Confirma nueva Contraseña</label>
            <input id="rePass" type="text" v-model="rePass">
            <button class="btn_pass">Cambiar Contraseña</button>
        </form>
      </div>
    
</template>

<style scoped>
</style>
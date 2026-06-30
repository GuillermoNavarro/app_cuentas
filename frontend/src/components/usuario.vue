<script setup>
    import { cambioPass, cargarUsuarios } from '../servicios/usuarioService';
    import { ref, onMounted } from 'vue';

    const mostrarPassOld = ref(false);
    const mostrarPassNew = ref(false);
    const mostrarPassRe = ref(false);

    const datos = ref({
        passAntigua: null,
        passNueva: null
    });

    const validarPass = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    }

    const rePass =ref(null);

    const usuarios = ref(null);

    const pass = async () => {
        if(!validarPass(datos.value.passNueva)){
            window.alert("La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero");
            return;
        }

        if(datos.value.passNueva === rePass.value){
            const respuesta = await cambioPass(datos.value);
            if(respuesta){
                window.alert("Contraseña cambiada");
                window.location.reload();
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
        <h2>Usuarios en su cuenta</h2>
        <div class="fila_user">
            <strong>Nombre</strong>
            <strong>Email</strong>
        </div>
        <div v-for="usuario in usuarios" :key="usuario.id_usuario" class="fila_user">
            <span>{{ usuario.nombre }}</span>
            <span>{{ usuario.email }}</span>
        </div>
      </div>
      <div class="cambio_pass">
        <h2>Cambio Contraseña</h2>
        <form @submit.prevent="pass()">
            <label for="oldPass">Constraseña Actual</label>
            <div class="input_btn">
                <input id="oldPass" :type="mostrarPassOld ? 'text' : 'password'" v-model="datos.passAntigua" required>
                <button class="btn_ocultar" type="button" @click="mostrarPassOld = !mostrarPassOld"><span class="material-symbols-outlined">{{  mostrarPassOld ? 'visibility_off' : 'visibility'}}</span></button>
            </div>
            <label for="newPass">Nueva Contraseña</label>
            <div class="input_btn">
                <input id="newPass" :type="mostrarPassNew ? 'text' : 'password'" v-model="datos.passNueva" placeholder="8 caracteres, 1 num, 1 mayus, 1 minus" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                <button class="btn_ocultar" type="button" @click="mostrarPassNew = !mostrarPassNew"><span class="material-symbols-outlined">{{  mostrarPassNew ? 'visibility_off' : 'visibility'}}</span></button>
            </div>
            <label for="rePass">Confirma nueva Contraseña</label>
            <div class="input_btn">
                <input id="rePass" :type="mostrarPassRe ? 'text' : 'password'" v-model="rePass" required>
                <button class="btn_ocultar" type="button" @click="mostrarPassRe = !mostrarPassRe"><span class="material-symbols-outlined">{{  mostrarPassRe ? 'visibility_off' : 'visibility'}}</span></button>
            </div>
            <button class="btn_pass">Cambiar Contraseña</button>
        </form>
      </div>
    
</template>

<style scoped>
*{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}

.lista_user, .cambio_pass {
    max-width: 500px;
    margin: -60px auto;
    padding: 15px 10px;
}

h2 {
    color: #333;
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 5px;
}

.fila_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid #eaeaea;
    transition: background-color 0.2s;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
}

.input_btn {
    position: relative;
    width: 100%;
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
}

input:focus {
    outline: none;
    border-color: #5754ff;
}

.btn_ocultar {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 0;
}

.btn_pass {
    width: 100%;
    padding: 12px;
    background-color: #5754ff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: opacity 0.2s;
}

.btn_pass:hover {
    opacity: 0.9;
}

</style>
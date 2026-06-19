<script setup>
import { ref } from 'vue';
const mostrarPass = ref(false);
const password = ref('');
const email = ref('');

const emit = defineEmits(['usuarioLogado']);

const hacerLogin = async () => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/login`;

    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email.value, password: password.value })
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            localStorage.setItem('token', datos);
            emit('usuarioLogado');
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}
</script>

<template>
    <div class="pantalla_login">
        <h2>Acceso a Cuentas</h2>
        <form class="card_login" id="login" @submit.prevent="hacerLogin()">
            <div>
                <div class="grupo_input">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="grupo_input">
                    <label for="pass">Password</label>
                    <div class="input_btn">
                        <input :type="mostrarPass ? 'text' : 'password'" id="pass" v-model="password" required>
                        <button class="btn_ocultar" type="button" @click="mostrarPass = !mostrarPass"><span class="material-symbols-outlined">{{  mostrarPass ? 'visibility_off' : 'visibility'}}</span></button>
                    </div>
                </div>
                <button class="btn_principal">Login</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .pantalla_login {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f4f4f9;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .card_login {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 400px;
    }

    .grupo_input {
        margin-top: 20px;
    }

    .input_btn{
        position: relative;
        width: 100%;
    }

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-top: 5px;
        box-sizing: border-box;
    }

    .btn_principal {
        width: 100%;
        padding: 12px;
        background-color: #5754ff;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 20px;
    }

    .btn_principal:hover {
        opacity: 0.9;
    }

    .btn_ocultar {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-35%);
        background: none;
        border: none;
       
        padding: 0;
        cursor: pointer;

    }

</style>
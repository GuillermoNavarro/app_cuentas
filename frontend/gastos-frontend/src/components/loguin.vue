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
            body: JSON.stringify({email: email.value, password: password.value})
        };
        try{
            const respuesta = await fetch(path, opciones);
            const datos = await respuesta.json();
            localStorage.setItem('token', datos);
            emit('usuarioLogado');
        }catch (err){
            console.log("error del servidor", err)
        }
    }
</script>

<template>
  <h2>Acceso a Cuentas</h2>
  <form id="login" @submit.prevent="hacerLogin()">
    <div>
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="pass">Password</label>
            <input :type="mostrarPass ? 'text' : 'password'" id="pass" v-model="password" required>
            <button type="button" @click= "mostrarPass = !mostrarPass">ocul</button>
        </div>
        <button>login</button>
    </div>
</form>
</template>

<style scoped>
 
   
</style>
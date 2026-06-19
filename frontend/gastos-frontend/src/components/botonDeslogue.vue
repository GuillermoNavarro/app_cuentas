<script setup>
    const emit = defineEmits(['usuarioDeslogado']);

    const deslog = () => {
        localStorage.removeItem('token');
        emit('usuarioDeslogado');
    }
</script>

<template>
    <button @click="deslog()">Deconectarse</button>
</template>

<style scoped>
  
</style>
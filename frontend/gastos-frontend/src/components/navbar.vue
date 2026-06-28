<script setup>
    const emit = defineEmits(['irResumen', 'irDetalle', 'irNuevo', 'irUsuario', 'usuarioDeslogado']);
    const props = defineProps(['vistaActual']);

    const deslog = () => {
        localStorage.removeItem('token');
        emit('usuarioDeslogado');
    }
</script>

<template>
    <nav class="barra_flotante">
        <button @click="emit('irResumen')" class="btn_nav" :class="{seleccionado: vistaActual === 'resumen'}">
            <span class="material-symbols-outlined icono_nav">overview</span>
            <span class="texto_nav">Resumen</span>
        </button>
        <button @click="emit('irDetalle')" class="btn_nav" :class="{seleccionado: vistaActual === 'detalle'}">
            <span class="material-symbols-outlined icono_nav">browse</span>
            <span class="texto_nav">Detalle</span>
        </button>
        <button @click="emit('irNuevo')" class="btn_nav" :class="{seleccionado: vistaActual === 'nuevo'}">
            <span class="material-symbols-outlined icono_nav">add</span>
            <span class="texto_nav">Crear</span>
        </button>
        <button @click="emit('irUsuario')" class="btn_nav" :class="{seleccionado: vistaActual === 'usuario'}">
            <span class="material-symbols-outlined icono_nav">person</span>
            <span class="texto_nav">Usuario</span>
        </button>
        <button @click="deslog()" class="btn_nav btn_salir">
            <span class="material-symbols-outlined icono_nav">logout</span>
            <span class="texto_nav">Salir</span>
        </button>
    </nav>  
    
</template>

<style scoped>
    .barra_flotante {
        position: fixed;
        bottom: calc(10px + env(safe-area-inset-bottom, 0px));
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 500px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 10px 20px;
        border-radius: 20px;
        box-shadow: 0 4px 15px rgba(0, 0,0, 0.1);
    }

    .btn_nav {
        background-color: transparent;
        border: none;
        color: #666;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .btn_salir {
        color: #ff4757;
    }

    .seleccionado .icono_nav {
        background-color: #e0e0ff;
        padding: 4px 16px;
        border-radius: 20px;
        font-variation-settings: 'FILL' 1;
    }


</style>
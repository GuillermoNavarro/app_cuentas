<script setup>
    import { onMounted } from 'vue';
    import { reciboMensual } from '../servicios/reciboService';
    import { cambiarEstado } from '../servicios/reciboService';
    import { ref } from 'vue';

    const props = defineProps(['mesRecibido', 'usuarioDeslogado']);
    const emit = defineEmits(['modificarRecibo']);

    const fecha = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}`;
    const fechaSeleccionada = ref(props.mesRecibido || fecha);
    const datos = ref(null);

    const cargarDatos = async () => {
        datos.value = await reciboMensual(fechaSeleccionada.value);
    }

    const modificarEstado = async (id_recibo) => {
        await cambiarEstado (id_recibo);
        cargarDatos();
    }

    onMounted(async () => {
        cargarDatos();
    })
</script>

<template>
    <div class="fecha">
        <span>Selección de fecha: </span>
        <input class="calendario" type="month" v-model="fechaSeleccionada" @change="cargarDatos()">
    </div>
    <div v-if="datos" class="contenedor">
        <div v-for="recibo in datos" :key="recibo.id_recibo" class="fila_mes" @click="emit('modificarRecibo', recibo)">
            <div class="col_fechas">
                <strong>{{ recibo.fecha?.split("T")[0] }}</strong>
            </div>
            <div class="col_movimientos">
                <strong class="ingreso">{{ recibo.detalle }}</Strong>
                <span class="gasto">{{recibo.tipo === "gasto" ? recibo.importe * -1 : recibo.importe}}€</span>
            </div>
            <div class="col_saldo">
                <strong>Estado:</strong>
                <span @click.stop="modificarEstado(recibo.id_recibo)"> {{ recibo.estado ? "Pagado" : "Pendiente" }} </span>
            </div>
        </div>
    </div>
    <div v-else>
        <h3>Cargando datos del mes...</h3>
    </div>
   
</template>

<style scoped>
    * {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .fecha {
        text-align: center;
    }

    .fila_mes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        border-bottom: 1px solid #eaeaea;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .fila_mes:hover, .fila_mes:active {
        background-color: #f8f9fa;
    }

    .col_movimientos {
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    .col_saldo {
        display: flex;
        flex-direction: column;
        text-align: right;
    }

    .positivo {
        color: rgb(94, 94, 255)
    }

    .negativo {
        color :rgb(252, 98, 98)
    }
   
</style>
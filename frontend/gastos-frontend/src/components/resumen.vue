<script setup>
    import { onMounted } from 'vue';
    import { resumen } from '../servicios/reciboService';
    import { ref } from 'vue';

    const emit = defineEmits(['verDetalle']);

    const fecha = `${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2,'0')}`;
    const fechaSeleccionada = ref(fecha);
    const datos = ref(null);
    

    const cargarDatos = async () => {
        console.log("Cargando datos para: ", fechaSeleccionada.value );
        datos.value = await resumen(fechaSeleccionada.value);
        console.log(datos.value);
    }

    onMounted(async () => {
        cargarDatos();
    })
</script>

<template>
    <div class="fecha">
        <span>Selección de fecha: </span>
        <input class="calendario" type="date" v-model="fechaSeleccionada" @change="cargarDatos()">
    </div>
    <div v-if="datos" class="contenedor">
        <div v-for="mesDatos in datos" :key="mesDatos.mes" class="fila_mes" @click="emit('verDetalle', mesDatos.mes)">
            <div class="col_fechas">
                <strong>{{ mesDatos.mes }}</strong>
            </div>
            <div class="col_movimientos">
                <span class="ingreso">Ingresos: {{ mesDatos.ingreso }}€</span>
                <span class="gasto">Gastos: {{mesDatos.gasto}}€</span>
            </div>
            <div class="col_saldo">
                <strong>Saldo:</strong>
                <strong :class="(mesDatos.ingreso - mesDatos.gasto) > 0 ? 'positivo' : 'negativo'">{{ mesDatos.ingreso - mesDatos.gasto}}€</strong>
            </div>
        </div>
    </div>
    <div v-else>
        <h3>Cargando datos del resumen...</h3>
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
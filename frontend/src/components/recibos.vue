<script setup>
import { onMounted, ref, computed } from 'vue';
import { reciboMensual, cambiarEstado, cambiarImporte } from '../servicios/reciboService';

const props = defineProps(['mesRecibido', 'usuarioDeslogado']);
const emit = defineEmits(['modificarRecibo']);
const pagado = ref(0);
const pendiente = ref(0);
const estadoFiltro = ref(false);

const datosfiltrados = computed(() => {
    if (!datos.value) return [];
    if(estadoFiltro.value){
        return datos.value.filter(recibo => recibo.tipo === 'gasto' && recibo.estado === 0);
    }
    return datos.value;
})

const fecha = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`;
const fechaSeleccionada = ref(props.mesRecibido || fecha);
const datos = ref(null);

const reciboEditando = ref(null);
const importeTemporal = ref(0);

const activarEdicion = (recibo) => {
    reciboEditando.value = recibo.id_recibo;
    importeTemporal.value = recibo.importe;
}

const cancelarEdicion = () => {
    reciboEditando.value = null;
}

const cargarDatos = async () => {
    const datosCrudos = await reciboMensual(fechaSeleccionada.value);
    let total = 0;
    pagado.value = 0;
    pendiente.value = 0;
    datosCrudos.forEach((dato) => {
        const importe = parseFloat(dato.importe);
        if (dato.tipo === 'ingreso') {
            total += importe;
        } else {
            total -= importe;
        }
        dato.total = total.toFixed(2);

        if (dato.tipo === 'gasto') {
            if (dato.estado) {
                pagado.value += importe;
            } else {
                pendiente.value += importe;
            }
        }
    });
    datos.value = datosCrudos;
}

const modificarEstado = async (id_recibo) => {
    await cambiarEstado(id_recibo);
    cargarDatos();
}

const guardarImporte = async (recibo) => {
    const datos = {
        id_recibo: recibo.id_recibo,
        importe: importeTemporal.value
    };
    await cambiarImporte(datos);
    reciboEditando.value = null
    cargarDatos();
}

const retrocedeMes = () => {
    const fecha = new Date(fechaSeleccionada.value + '-01')
    fecha.setMonth(fecha.getMonth() - 1)
    fechaSeleccionada.value = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`
    cargarDatos();
}

const avanzarMes = () => {
    const fecha = new Date(fechaSeleccionada.value + '-01')
    fecha.setMonth(fecha.getMonth() + 1)
    fechaSeleccionada.value = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`
    cargarDatos();
}

const formatearFechaCorta = (fecha) => {
    const fechaModif = new Date(fecha);
    const letrasDia = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    return `${fechaModif.getDate().toString().padStart(2, '0')} - ${(letrasDia[fechaModif.getDay()])}`;
}

const obtenerTextoEstado = (recibo) => {
    if(!recibo.estado) return "Pendiente";
    return recibo.tipo === 'gasto' ? "Pagado" : "Cobrado"; 
}

onMounted(async () => {
    cargarDatos();
})
</script>

<template>
    <header>
        <div class="valores">
            <div class="pagado">
                <span>Pag: </span>
                <span>{{ pagado.toFixed(2) }} €</span>
            </div>
            <button class="filtro" :class="{ 'filtro-activo' : estadoFiltro }" @click="estadoFiltro = !estadoFiltro">
                <span class="material-symbols-outlined">{{ estadoFiltro ? 'filter_alt_off' : 'filter_alt' }}</span>
            </button>
            <div class="pendiente">
                <span>Pdt: </span>
                <span>{{ pendiente.toFixed(2) }} €</span>
            </div>
        </div>
        <div class="fecha">
            <button class="btn_mes" @click="retrocedeMes"><span
                    class="material-symbols-outlined">chevron_left</span></button>
            <div>
                <span>Selección de fecha: </span>
                <input class="calendario" type="month" v-model="fechaSeleccionada" @change="cargarDatos()">
            </div>
            <button class="btn_mes" @click="avanzarMes"><span
                    class="material-symbols-outlined">chevron_right</span></button>
        </div>
    </header>
    <div v-if="datos" class="contenedor">
        <div v-for="recibo in datosfiltrados" :key="recibo.id_recibo" class="fila_mes" @click="emit('modificarRecibo', recibo)">
            <div class="col_fechas">
                <strong>{{ formatearFechaCorta(recibo.fecha) }}</strong>
            </div>
            <div class="col_movimientos">
                <strong class="detalle">{{ recibo.detalle }}</Strong>
                <div v-if="recibo.id_recibo === reciboEditando" class="editor_importe">
                    <button class="btn_inline ko" @click.stop="cancelarEdicion()"><span
                            class="material-symbols-outlined">close</span></button>
                    <input type="number" step="0.01" v-model="importeTemporal" @click.stop class="input_inline">
                    <button class="btn_inline ok" @click.stop="guardarImporte(recibo)"><span
                            class="material-symbols-outlined">check</span></button>
                </div>
                <div v-else class="importe_click" @click.stop="activarEdicion(recibo)" title="Editar importe">
                    <span class="importe">{{ recibo.tipo === "gasto" ? recibo.importe * -1 : recibo.importe }} €</span>
                </div>
            </div>
            <div class="col_saldo">
                <span @click.stop="modificarEstado(recibo.id_recibo)" class="estado_click"
                    :class="recibo.estado ? 'estado_pagado' : 'estado_pendiente'">
                    {{ obtenerTextoEstado(recibo) }}
                </span>
                <span :class="recibo.total >= 0 ? 'positivo' : 'negativo'"> {{ recibo.total }} €</span>
            </div>
        </div>
    </div>
    <div v-else class="contenedor">
        <h3>Conectanod con servidor ...</h3>
    </div>

</template>

<style scoped>
* {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
}

.fecha {
    text-align: center;
    display: flex;
    justify-content: space-between;
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

.fila_mes:hover,
.fila_mes:active {
    background-color: #f8f9fa;
}

.col_movimientos {
    display: flex;
    flex-direction: column;
    text-align: center;
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
    color: rgb(252, 98, 98)
}

.btn_mes {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.btn_mes:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}

.importe_click {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.importe_click:hover {
    background-color: #e0e0ff;
}

.icono_editar {
    font-size: 16px;
    color: #5754ff;
    opacity: 0;
    transition: opacity 0.2s;
}

.importe_click:hover .icono_editar {
    opacity: 1;
}

.editor_importe {
    display: flex;
    align-items: center;
    gap: 5px;
}

.input_inline {
    width: 70px;
    padding: 4px;
    border: 1px solid #5754ff;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
}

.btn_inline {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
}

.btn_inline.ok {
    color: #10b981;
}

.btn_inline.ko {
    color: #ef4444;
}

.estado_click {
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    padding: 3px 8px;
    border-radius: 12px;
    transition: all 0.2s ease;
    display: inline-block;
    margin-bottom: 5px;
}

.estado_pagado {
    color: #9ca3af;
    /* Texto gris */
    background-color: #f3f4f6;
    /* Fondo gris súper claro */
}

.estado_pagado:hover {
    background-color: #e5e7eb;
    color: #4b5563;
}

/* Estado Pendiente: Llama la atención suavemente */
.estado_pendiente {
    color: #d97706;
    /* Texto naranja/ámbar */
    background-color: #fef3c7;
    /* Fondo amarillo pastel */
}

.estado_pendiente:hover {
    background-color: #fde68a;
    color: #b45309;
}

.valores {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin-bottom: 5px;
    color: #979797;

}

header {
    position: fixed;
    top: 0;
    padding-top: calc(50px + env(safe-area-inset-top, 0px));
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    z-index: 800;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 5px;
}

.contenedor {
    padding-top: calc(45px + env(safe-area-inset-top, 0px));
}

.filtro {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #979797;
    transition: all 0.2s ease;
}

.filtro:hover {
    color: #555555;
}

.filtro-activo {
    color: #111111
}

</style>
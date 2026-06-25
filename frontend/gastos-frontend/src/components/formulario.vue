<script setup>
    import { guardReactiveProps, onMounted, ref, computed } from 'vue';
    import { crearRecibo, modificarRecibo, borrarRecibo } from '../servicios/reciboService';
    import { crearPrevisto, verPrevisto, modificarPrevisto, borrarPrevisto } from '../servicios/previstoService';

    const formulario = ref({
        id_recibo: null,
        id_previsto: null,
        fecha: '',
        fecha_inicio: '',
        fecha_fin: '',
        importe: 0,
        importe_serie: 0,
        tipo: '',
        detalle: '',
        detalle_serie: '',
        mostrar: 'unico'
    });

    const emit = defineEmits(['volverDetalle']);
    const props = defineProps(['datosRecibo']);

    const vista = computed(() => {
        return props.datosRecibo ? 'editar' : 'nuevo';
    });
    
    const formatearFecha = (fecha) => {
        return `${new Date(fecha).getFullYear()}-${(new Date(fecha).getMonth()+1).toString().padStart(2, '0')}-${(new Date(fecha).getDate()).toString().padStart(2, '0')}`;
    }

    const procesarFormulario = () => {
        if(vista.value === 'nuevo'){
            guardarDatos();
        }else{
            modificarDatos();
        }
    };

    const guardarDatos = async () => {

        if(formulario.value.mostrar === 'unico'){
            const datos = {
                "fecha": formulario.value.fecha,
                "importe": formulario.value.importe,
                "tipo": formulario.value.tipo,
                "detalle": formulario.value.detalle
            }
            await crearRecibo(datos);

            formulario.value.fecha = null;
            formulario.value.importe = null;
            formulario.value.tipo = '';
            formulario.value.detalle = '';

        }else if(formulario.value.mostrar === 'serie'){
            const datos = {
                "detalle": formulario.value.detalle_serie,
                "fecha_inicio": formulario.value.fecha_inicio,
                "fecha_fin": formulario.value.fecha_fin,
                "importe": formulario.value.importe_serie,
                "tipo": formulario.value.tipo 
            }
            await crearPrevisto(datos);

            formulario.value.fecha = null;
            formulario.value.importe_serie = null;
            formulario.value.tipo = '';
            formulario.value.detalle_serie = '';
            formulario.value.fecha_fin = null;
        }
    }

    const modificarDatos = async (id_recibo) => {
       const confirmacion = window.confirm("¿Seguro que desea modificar este recibo?");
        if(confirmacion){
            if(formulario.value.mostrar === 'unico'){
                const datos = {
                    "id_recibo": formulario.value.id_recibo,
                    "fecha": formulario.value.fecha,
                    "importe": formulario.value.importe,
                    "tipo": formulario.value.tipo,
                    "detalle": formulario.value.detalle
                }
                await modificarRecibo(datos);

            }else if(formulario.value.mostrar === 'serie'){
                const datos = {
                    "id_previsto": formulario.value.id_previsto,
                    "detalle": formulario.value.detalle_serie,
                    "fecha_inicio": formulario.value.fecha_inicio,
                    "fecha_fin": formulario.value.fecha_fin,
                    "importe": formulario.value.importe_serie,
                    "tipo": formulario.value.tipo 
                }
                await modificarPrevisto(datos);
            }
            emit("volverDetalle");
        }
    }

    const cargarDatosSerie = async () => {
        if(vista.value === 'editar'){
            const respuesta = await verPrevisto(formulario.value.id_previsto);
            const datosPrev = respuesta[0];
            formulario.value.fecha_inicio=formatearFecha(datosPrev.fecha_inicio);
            formulario.value.fecha_fin=formatearFecha(datosPrev.fecha_fin);
            formulario.value.detalle_serie=datosPrev.detalle;
            formulario.value.importe_serie=datosPrev.importe;
        }
    }

    const borrarDatos = async () => {
        const confirmacion = window.confirm("¿Seguro que desea borrar este recibo?");
        if(confirmacion){
            if(formulario.value.mostrar === 'unico'){
                await borrarRecibo(formulario.value.id_recibo);
            }else if(formulario.value.mostrar === 'serie'){
                await borrarPrevisto(formulario.value.id_previsto);
            }
            emit("volverDetalle");
        }
    }

    const cancelarDatos = () => {
        if(vista.value === 'nuevo'){
            formulario.value.id_recibo = null;
            formulario.value.id_previsto = null;
            formulario.value.fecha = '';
            formulario.value.fecha_inicio = '';
            formulario.value.fecha_fin = '';
            formulario.value.importe = 0;
            formulario.value.importe_serie = 0;
            formulario.value.tipo = '';
            formulario.value.detalle = '';
            formulario.value.detalle_serie = '';           
        }else if(vista.value === 'editar'){
            emit("volverDetalle");
        }
    }
 

    onMounted(async () => {
        if(vista.value === 'editar'){
            Object.assign(formulario.value, props.datosRecibo);
            formulario.value.fecha = formatearFecha(formulario.value.fecha);
        } 
    });
</script>

<template>
    <div class="radio_grupo">
        <label class="radio_tipo">
            <input type="radio" value="unico" v-model="formulario.mostrar">
            <span>Unico</span> 
        </label>
        
        <label class="radio_tipo">
            <input type="radio" value="serie" v-model="formulario.mostrar" @change="cargarDatosSerie">
            <span>Serie</span>
        </label>
    </div>
    <form @submit.prevent="procesarFormulario()" class="contenedor_formulario">
        <div class="contenedor_fechas">
            <div class="fechas" v-if="formulario.mostrar === 'unico'">
                <label for="fecha">Fecha Efectivo:</label>
                <input class="fecha" type="date" v-model="formulario.fecha" required>
            </div>
            <div class="fechas" v-if="formulario.mostrar === 'serie'">
                <label for="fecha_inicio">Fecha Inicio:</label>
                <input class="fecha" type="date" v-model="formulario.fecha_inicio" required>
            </div>
            <div class="fechas" v-if="formulario.mostrar === 'serie'">
                <label for="fecha_fin">Fecha Fin:</label>
                <input class="fecha" type="date" v-model="formulario.fecha_fin" required>
            </div>
        </div>
        <div class="contenedor_tipo">
            <label>Detalle:</label>
            <input type="text" v-if="formulario.mostrar === 'unico'" class="descripcion" v-model="formulario.detalle" required>
            <input type="text" v-if="formulario.mostrar === 'serie'" class="descripcion" v-model="formulario.detalle_serie" required>
            <label>Importe:</label>
            <input type="number" v-if="formulario.mostrar === 'unico'" min="0" step="0.01" class="importe" v-model="formulario.importe" required>
            <input type="number" v-if="formulario.mostrar === 'serie'" min="0" step="0.01" class="importe" v-model="formulario.importe_serie" required>
            <label>Tipo</label>
            <select class="select_tipo" v-model="formulario.tipo" required>
                <option value="" disabled>Selecciona del tipo</option>
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
            </select>
        </div>
        <div class="contenedor_botones">
            <button class="btn_guardar" v-if="vista === 'nuevo'">Guardar</button>
            <button class="btn_modificar" v-if="vista === 'editar'">Modificar</button>
            <button class="btn_cancelar" type="button" @click="cancelarDatos()">Cancelar</button>
            <button class="btn_borrar" type="button" v-if="vista === 'editar'" @click="borrarDatos()">borrar</button>
        </div>
    </form>

</template>

<style scoped>
    * {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .radio_tipo input{
        display: none;
    }

    .radio_tipo span {
        padding: 12px 24px;
        background-color: #f4f4f9;
        border: 2px solid #ddd;
        border-radius: 8px;
        color: #666;
        font-weight: bold;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        transition: all 0.2s ease;
    }

    .radio_tipo span:hover {
        background-color: #e2e2e2;
    }

    .radio_tipo input:checked + span {
        background-color: #5754ff;
        color: white;
        border-color: #5754ff;
        box-shadow: 0 4px 10px rgba(87,84,255,0.3);
    }

    .radio_grupo {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .contenedor_formulario {
        display: flex;
        flex-direction: column;
        padding: 10px;
        max-width: 400px;
        margin: 30px auto;

    }

    .contenedor_tipo {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        gap: 5px;
    }

    .contenedor_fechas {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap:10px;
    }

    .contenedor_botones {
        display: flex;
        gap: 15px;
        justify-content: center;
        padding-top: 20px;
    }

    button {
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    .btn_guardar, .btn_modificar {
        background-color: #5754ff;
        color: white;
    }

    .btn_cancelar {
        background-color: #f4f4f9;
    }

    .btn_borrar {
        background-color: #ff5252;
        color:white;
    }

    .descripcion, .importe, .fecha, .select_tipo {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-sizing: border-box;
    }

    .fechas{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
    }
        
</style>
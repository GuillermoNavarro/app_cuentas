export const resumen = async (fecha) => {
    
    const mesVar = new Date(fecha).getMonth() + 1;
    const anioVar = new Date(fecha).getFullYear();
    const parametros = new URLSearchParams({
        mes: mesVar,
        anio: anioVar
    });
    const path = `${import.meta.env.VITE_API_URL}/api/v1/resumen?${parametros}`;
    const opciones = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }    
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const reciboMensual = async (fecha) => { 
    const mesVar = new Date(fecha).getMonth() + 1 ;
    const anioVar = new Date(fecha).getFullYear();
    const parametros = new URLSearchParams({
        mes: mesVar,
        anio: anioVar
    });
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos?${parametros}`;
    const opciones = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }    
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const cambiarEstado = async (id_recibo) => { 
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos/${id_recibo}`;
    const opciones = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }    
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const borrarRecibo = async (id_recibo) => { 
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos/${id_recibo}`;
    const opciones = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }    
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const crearRecibo = async (recibo) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos`;

    const opciones = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            fecha: recibo.fecha, 
            importe: recibo.importe,
            tipo: recibo.tipo,
            detalle: recibo.detalle
         })
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const modificarRecibo = async (recibo) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos/${recibo.id_recibo}`;

    const opciones = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            fecha: recibo.fecha, 
            importe: recibo.importe,
            tipo: recibo.tipo,
            detalle: recibo.detalle
         })
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}

export const cambiarImporte = async (recibo) => { 
    const path = `${import.meta.env.VITE_API_URL}/api/v1/recibos/importe/${recibo.id_recibo}`;
    const opciones = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({importe: recibo.importe})    
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            return datos;
        }else if(respuesta.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
            return null;
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}
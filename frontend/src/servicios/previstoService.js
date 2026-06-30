export const crearPrevisto = async (previsto) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/previstos`;

    const opciones = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            detalle: previsto.detalle,
            fecha_inicio: previsto.fecha_inicio,
            fecha_fin: previsto.fecha_fin, 
            importe: previsto.importe,
            tipo: previsto.tipo
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

export const verPrevisto = async (id_previsto) => { 
    const path = `${import.meta.env.VITE_API_URL}/api/v1/previstos/${id_previsto}`;
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

export const modificarPrevisto = async (previsto) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/previstos/${previsto.id_previsto}`;

    const opciones = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            detalle: previsto.detalle,
            fecha_inicio: previsto.fecha_inicio,
            fecha_fin: previsto.fecha_fin, 
            importe: previsto.importe,
            tipo: previsto.tipo
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

export const borrarPrevisto = async (id_previsto) => { 
    const path = `${import.meta.env.VITE_API_URL}/api/v1/previstos/${id_previsto}`;
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
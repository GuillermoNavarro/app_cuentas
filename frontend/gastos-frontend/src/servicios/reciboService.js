export const resumen = async (fecha) => {
    
    const mesVar = new Date(fecha).getMonth();
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
            console.log(datos);
        }else{
            alert(datos.error);
        }
    } catch (err) {
        console.log("error del servidor", err)
    }
}
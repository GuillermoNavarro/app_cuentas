export const login = async (usuario) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/login`;
    
    const opciones = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            email: usuario.email,
            password: usuario.password
        })
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            localStorage.setItem('token', datos);
            return true
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

export const cambioPass = async (usuario) => {
    const path = `${import.meta.env.VITE_API_URL}/api/v1/usuario`;
    
    const opciones = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            passAntigua: usuario.passAntigua,
            passNueva: usuario.passNueva
        })
    };
    try {
        const respuesta = await fetch(path, opciones);
        const datos = await respuesta.json();
        if(respuesta.status === 200) {
            localStorage.setItem('token', datos);
            return true
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

export const cargarUsuarios= async () => {
        
    const path = `${import.meta.env.VITE_API_URL}/api/v1/usuario`;
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


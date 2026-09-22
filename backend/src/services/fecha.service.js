const calcularFechaSiguiente = (fecha, diaOriginal, avance) => {
    const ultDia = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + avance + 1 , 0)).getUTCDate();
    const diaDestino = Math.min(diaOriginal, ultDia);
    const fechaDestino = new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth() + avance, diaDestino));
    return fechaDestino;
};

module.exports = {
    calcularFechaSiguiente
};
const { calcularFechaSiguiente } = require("../src/services/fecha.service");

test("calcula correctamente el siguiente mes", () => {
    const fecha = new Date("2026-01-31");

    const resultado = calcularFechaSiguiente(fecha, 31, 1);

    expect(resultado.toISOString().split("T")[0]).toBe("2026-02-28");
});

test("calcula correctamente el siguiente mes en año bisiesto", () => {
    const fecha = new Date("2028-01-31");

    const resultado = calcularFechaSiguiente(fecha, 31, 1);

    expect(resultado.toISOString().split("T")[0]).toBe("2028-02-29");
});

test("calcula correctamente el siguiente mes dia normal", () => {
    const fecha = new Date("2026-01-15");

    const resultado = calcularFechaSiguiente(fecha, 15, 1);

    expect(resultado.toISOString().split("T")[0]).toBe("2026-02-15");
});

test("mantiene el dia al cambiar de marzo a abril", () => {
    const fecha = new Date("2026-03-15");

    const resultado = calcularFechaSiguiente(fecha, 15, 1);

    expect(resultado.toISOString().split("T")[0]).toBe("2026-04-15");
});

test("calcula correctamente avance de 2 meses", () => {
    const fecha = new Date("2026-05-15");

    const resultado = calcularFechaSiguiente(fecha, 15, 2);

    expect(resultado.toISOString().split("T")[0]).toBe("2026-07-15");
});

test("calcula correctamente avance de 4 meses con cambio de año", () => {
    const fecha = new Date("2026-11-30");

    const resultado = calcularFechaSiguiente(fecha, 30, 4);

    expect(resultado.toISOString().split("T")[0]).toBe("2027-03-30");
});


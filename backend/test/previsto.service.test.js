jest.mock("../src/config/db.js", () => ({
    promise: jest.fn()
}));

jest.mock("../src/services/recibo.service.js", () => ({
    crearRecibo: jest.fn()
}));

const pool = require("../src/config/db");
const { crearRecibo } = require("../src/services/recibo.service");
const { crearPrevisto, obtenerPrevisto, modificarPrevisto, borrarPrevisto } = require("../src/services/previsto.service");

let query;

beforeEach(() => {
    jest.clearAllMocks();
    query = jest.fn();
    pool.promise.mockReturnValue({ query });
    crearRecibo.mockResolvedValue({});
});


describe("crearPrevisto", () => {
    test("insertar el previsto con los datos recibidos", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        const resultado = await crearPrevisto(
            "Alquiler",
            "2026-01-15",
            "2026-02-15",
            850,
            "gasto",
            7
        );

        expect(query).toHaveBeenCalledWith(
            "INSERT INTO previsto(detalle, fecha_inicio, fecha_fin, importe, tipo, id_hogar) VALUES (?,?,?,?,?,?)",
            [
                "Alquiler",
                "2026-01-15",
                "2026-02-15",
                850,
                "gasto",
                7
            ]
        );

    });

    test("genera un recibo por cada mensualidad del previsto", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        await crearPrevisto(
            "Alquiler",
            "2026-01-15",
            "2026-05-15",
            850,
            "gasto",
            7
        );

        expect(crearRecibo).toHaveBeenCalledTimes(5);
        expect(crearRecibo).toHaveBeenNthCalledWith(
            1,    
            42,
            7,
            "2026-01-15",
            850,
            "gasto",
            "Alquiler"
        );
        expect(crearRecibo).toHaveBeenNthCalledWith(
            2,    
            42,
            7,
            "2026-02-15",
            850,
            "gasto",
            "Alquiler"
        );
        expect(crearRecibo).toHaveBeenNthCalledWith(
            3,    
            42,
            7,
            "2026-03-15",
            850,
            "gasto",
            "Alquiler"
        );
        expect(crearRecibo).toHaveBeenNthCalledWith(
            4,    
            42,
            7,
            "2026-04-15",
            850,
            "gasto",
            "Alquiler"
        );
        expect(crearRecibo).toHaveBeenNthCalledWith(
            5,    
            42,
            7,
            "2026-05-15",
            850,
            "gasto",
            "Alquiler"
        );
    });

    test("no genera recibos si el previsto no se inserta", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 0,
                insertId: 0
            }
        ]);

        await crearPrevisto(
            "Alquiler",
            "2026-01-15",
            "2026-05-15",
            850,
            "gasto",
            7
        );

        expect(crearRecibo).not.toHaveBeenCalled();
    });

    test("falla si no se puede generar un recibo", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        crearRecibo.mockRejectedValueOnce(new Error("Error al crear recibo"));

        await expect(
            crearPrevisto(
                "Alquiler",
                "2026-01-15",
                "2026-05-15",
                850,
                "gasto",
                7
            )
        ).rejects.toThrow("Error al crear recibo");
    });

    test("se genera un recibo el ultimo dia del mes", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        await crearPrevisto(
            "Alquiler",
            "2026-01-31",
            "2026-05-31",
            850,
            "gasto",
            7
        );

        expect(crearRecibo).toHaveBeenCalledTimes(5);
        expect(crearRecibo.mock.calls.map((llamada) => llamada[2])).toEqual([
                "2026-01-31",
                "2026-02-28",
                "2026-03-31",
                "2026-04-30",
                "2026-05-31"
            ]);


    });

    test("se genera un recibo el dia 30 del mes", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        await crearPrevisto(
            "Alquiler",
            "2027-11-30",
            "2028-03-30",
            850,
            "gasto",
            7
        );

        expect(crearRecibo).toHaveBeenCalledTimes(5);
        expect(crearRecibo.mock.calls.map((llamada) => llamada[2])).toEqual([
                "2027-11-30",
                "2027-12-30",
                "2028-01-30",
                "2028-02-29",
                "2028-03-30"
            ]);
    });

    test("si fechaFin es anterior a fechaInicio, la normaliza y genera un único recibo", async () => {
        query.mockResolvedValueOnce([
            {
                affectedRows: 1,
                insertId: 42
            }
        ]);

        await crearPrevisto(
            "Alquiler",
            "2026-05-15",
            "2026-01-15",
            850,
            "gasto",
            7
        );


        expect(query).toHaveBeenCalledWith(
            expect.any(String),
            ["Alquiler", "2026-05-15", "2026-05-15", 850, "gasto",7]
        );
        expect(crearRecibo).toHaveBeenCalledTimes(1);
        expect(crearRecibo).toHaveBeenNthCalledWith(
            1,    
            42,
            7,
            "2026-05-15",
            850,
            "gasto",
            "Alquiler"
        );

    });
});

describe("obtenerPrevisto", () => {
    test("devuelve el previsto solicitado", async () => {
        const previsto = {
            id_previsto: 42,
            detalle: "Alquiler",
            fecha_inicio: "2026-01-15",
            fecha_fin: "2026-05-15",
            importe: 850,
            tipo: "gasto",
            id_hogar: 7
        };

        query.mockResolvedValueOnce([previsto]);

        const resultado = await obtenerPrevisto(42, 7);

        expect(query).toHaveBeenCalledWith(
            "SELECT * FROM previsto WHERE id_previsto = ? AND id_hogar = ?", 
            [42, 7]
        );

        expect(resultado).toEqual(previsto);
    });

    
    test("no devuelve nada si el id_hogar no coincide", async () => {
        query.mockResolvedValueOnce([[]]);

        const resultado = await obtenerPrevisto(42, 2);

        expect(query).toHaveBeenCalledWith(
            "SELECT * FROM previsto WHERE id_previsto = ? AND id_hogar = ?", 
            [42, 2]
        );

        expect(resultado).toEqual([]);
    });

    test("no devuelve nada si el id_previsto no existe", async () => {     
        query.mockResolvedValueOnce([[]]);

        const resultado = await obtenerPrevisto(45, 7);

        expect(query).toHaveBeenCalledWith(
            "SELECT * FROM previsto WHERE id_previsto = ? AND id_hogar = ?", 
            [45, 7]
        );

        expect(resultado).toEqual([]);
    });
});

describe("borrarPrevisto", () => {
    test("elimina el previsto si no tiene recibos pagados", async () => {
        query
            .mockResolvedValueOnce([[{ fin_fecha: null}]])
            .mockResolvedValueOnce([{ affectedRows: 1}]);

        const resultado = await borrarPrevisto(42,7);

        expect(query).toHaveBeenNthCalledWith(
            1,
            expect.stringContaining("SELECT max(fecha) AS fin_fecha FROM recibo"),
            [42, 7],
            
        );

        expect(query).toHaveBeenNthCalledWith(
            2,
            "DELETE FROM previsto WHERE id_previsto = ? AND id_hogar = ?", 
            [42, 7]
        );

        expect(resultado).toBe(true);
    });

    test("no borra nada si el previsto no exite o si el id_hogar no coincide", async () => {
        query
            .mockResolvedValueOnce([[{ fin_fecha: null}]])
            .mockResolvedValueOnce([{ affectedRows: 0}]);

        const resultado = await borrarPrevisto(42,7);

        expect(resultado).toBe(false);
    });

    test("si pagado y pendiente, actualiza previsto y borra los pendientes", async () => {
        query
            .mockResolvedValueOnce([[{ fin_fecha: "2026-03-15"}]])
            .mockResolvedValueOnce([{ affectedRows: 1}])
            .mockResolvedValueOnce([{ affectedRows: 2}]);

        const resultado = await borrarPrevisto(42,7);

        expect(query).toHaveBeenNthCalledWith(
            1,
            expect.stringContaining("SELECT max(fecha) AS fin_fecha FROM recibo"),
            [42, 7]
            
        );

        expect(query).toHaveBeenNthCalledWith(
            2,
            "UPDATE previsto SET fecha_fin = ? WHERE id_previsto = ? AND id_hogar = ?", 
            ["2026-03-15", 42, 7]
        );

        expect(query).toHaveBeenNthCalledWith(
            3,
            expect.stringContaining("DELETE FROM recibo WHERE id_previsto"), 
            [42, 7]
        );

        expect(resultado).toBe(true);
    });

    test("si esta todo pagado sigue devolviendo true aunque no borre nada", async () => {
        query
            .mockResolvedValueOnce([[{ fin_fecha: "2026-03-15"}]])
            .mockResolvedValueOnce([{ affectedRows: 1}])
            .mockResolvedValueOnce([{ affectedRows: 0}]);

        const resultado = await borrarPrevisto(42,7);

        expect(query).toHaveBeenCalledTimes(3);
        expect(resultado).toBe(true);
    });
});
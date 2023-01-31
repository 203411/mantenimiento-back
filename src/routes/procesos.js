const express = require("express");
const router = express.Router();
const pool = require("../database");

const bd = require("body-parser");

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));

router.get("/",async (req, res) => {
    const procesos = await pool.query("SELECT * FROM proceso");
    // res.render("procesos/list", { procesos });
    res.send(procesos);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const procesos = await pool.query("SELECT * FROM proceso WHERE id = ?", [id]);
    res.send(procesos);
});

router.post("/", async (req, res) => {
    const { nombre,id_fase,id_rol,diagrama,ev_entrada,ev_salida,frecuencia,categoria, objetivo,proposito,metricas,identificadores,actividades,participantes} = req.body;
    const newProceso = {
        nombre, id_fase,id_rol, diagrama,ev_entrada,ev_salida, frecuencia, categoria, objetivo,proposito,metricas,identificadores,actividades,participantes
    };

    await pool.query("INSERT INTO proceso set ?", [newProceso]);
    res.send(req.body);
});





router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const procesos = await pool.query("SELECT * FROM proceso WHERE id = ?", [id]);
    res.send(procesos);
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre,id_fase,id_rol,diagrama,ev_entrada,ev_salida,frecuencia,categoria, objetivo,proposito,metricas,identificadores,actividades,participantes} = req.body;
    const newProceso = {
        nombre, id_fase,id_rol, diagrama,ev_entrada,ev_salida, frecuencia, categoria, objetivo,proposito,metricas,identificadores,actividades,participantes
    };
    await pool.query("UPDATE proceso set ? WHERE id = ?", [newProceso, id]);
    res.send(req.body);
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM proceso WHERE id = ?", [id]);
    res.send("Proceso eliminado");
});

module.exports = router;
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/",async (req, res) => {
    const procesos = await pool.query("SELECT * FROM proceso");
    // res.render("procesos/list", { procesos });
    res.send(procesos);
});

router.get("/:id", async (req, res) => {
    const procesos = await pool.query("SELECT * FROM proceso WHERE id = ?", [id]);
    res.send(procesos);
});

router.post("/", async (req, res) => {
    const { nombre, descripcion, estado } = req.body;
    const newProceso = {
        nombre,
        descripcion,
        estado
    };
    await pool.query("INSERT INTO proceso set ?", [newProceso]);
    // res.redirect("/procesos");
    res.send("Proceso agregado");
});






module.exports = router;
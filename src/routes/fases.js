const express = require("express");
const router = express.Router();
const pool = require("../database");

const bd = require("body-parser");

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));

router.get("/",async (req, res) => {
    const fases = await pool.query("SELECT * FROM fase");
    // res.render("fases/list", { fases });
    res.send(fases);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const fases = await pool.query("SELECT * FROM fase WHERE id = ?", [id]);
    res.send(fases);
});

router.post("/", async (req, res) => {
    const { nombre,id_rol,id_proyecto} = req.body;
    const newFase = {
        nombre,id_rol,id_proyecto
    };

    await pool.query("INSERT INTO fase set ?", [newFase]);
    res.send(req.body);
});






router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const fases = await pool.query("SELECT * FROM fase WHERE id = ?", [id]);
    res.send(fases);
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre,id_rol,id_proyecto} = req.body;
    const newFase = {
        nombre,id_rol,id_proyecto
    };
    await pool.query("UPDATE fase set ? WHERE id = ?", [newFase, id]);
    res.send(req.body);
});

router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM fase WHERE id = ?", [id]);
    res.send("Fase eliminada");
});

module.exports = router;
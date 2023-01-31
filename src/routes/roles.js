const express = require("express");

const router = express.Router();

//id, nombre
const pool = require("../database");

const bd = require("body-parser");

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));

router.get("/",async (req, res) => {
    const roles = await pool.query("SELECT * FROM rol");
    res.send(roles);
});

//Filtrar por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const roles = await pool.query("SELECT * FROM rol WHERE id = ?", [id]);
    res.send(roles);
});

router.post("/", async (req, res) => {
    const { nombre } = req.body;
    const roles = await pool.query("INSERT INTO rol (nombre) VALUES (?)", [nombre]);
    res.send(roles);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const roles = await pool.query("UPDATE rol SET nombre = ? WHERE id = ?", [nombre, id]);
    res.send(roles);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM rol WHERE id = ?", [id]);
    res.send("Rol eliminado");
});


module.exports = router;



module.exports = router;
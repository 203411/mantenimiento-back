const express = require("express");
const router = express.Router();
const pool = require("../database");
const bd = require("body-parser");

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));
//consultas
router.get("/",async (req, res) => {
    const empresas = await pool.query("SELECT * FROM empresa");
    res.send(empresas);
});
//consultas por id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const empresas = await pool.query("SELECT * FROM empresa WHERE id = ?", [id]);
    res.send(empresas);
});
//mostrar docs cargados
router.get("/docs/:id", async (req, res) => {
    const { id } = req.params;
    const empresas = await pool.query("SELECT organigrama,cond_gen FROM empresa WHERE id = ?", [id]);
    res.send(empresas);
});
//insertar datos
router.post("/", async (req, res) => {
    const { id, nombre, historia, organigrama, funcion_puesto, alcance, vocabulario, cond_gen, mision, vision, politicas, logo, doc_ref, minuta_acuer} = req.body; //datos requeridos
    const nuevaEmpresa = {
        id, nombre, historia, organigrama, funcion_puesto, alcance, vocabulario, cond_gen, mision, vision, politicas, logo, doc_ref, minuta_acuer
    };

    await pool.query("INSERT INTO empresa set ?", [nuevaEmpresa]);
    res.send(req.body);
});
//eliminar
router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM fase WHERE id = ?", [id]);
    res.send("empresa eliminada");
});
//editar
router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const empresas = await pool.query("SELECT * FROM empresa WHERE id = ?", [id]);
    res.send(empresas);
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre,id_rol,id_proyecto} = req.body;
    const nuevaEmpresa = {
        nombre,id_rol,id_proyecto
    };
    await pool.query("UPDATE empresa set ? WHERE id = ?", [nuevaEmpresa, id]);
    res.send(req.body);
});

module.exports = router;
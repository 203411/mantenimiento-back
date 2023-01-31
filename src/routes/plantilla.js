const express = require("express");
const router = express.Router();

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));
// consulta
router.get("/",async (req, res) => {
    const plantilla = await pool.query("SELECT * FROM plantilla");
    res.send(plantilla);
});
// consulta por id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const empresas = await pool.query("SELECT * FROM plantilla WHERE id = ?", [id]);
    res.send(empresas);
});
// insertar datos
router.post("/", async (req, res) => {
    const { id_evidencia, link} = req.body;
    const newPlantilla = {
        id_evidencia, link
    };
    await pool.query("INSERT INTO plantilla set ?", [newPlantilla]);
    res.send(req.body);
});
// eliminar
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM plamtilla WHERE id = ?", [id]);
    res.send("Plantilla eliminada");
});
module.exports = router;
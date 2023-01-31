const express = require("express");

const router = express.Router();


//id, nombre, descripcion, propietario, estatus

const pool = require("../database");

const bd = require("body-parser");

router.use(bd.json());
router.use(bd.urlencoded({ extended: true }));

router.get("/",async (req, res) => {
    const proyectos = await pool.query("SELECT * FROM proyecto");
    res.send(proyectos);
});

//Filtrar por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE id = ?", [id]);
    res.send(proyectos);
});

//Filtrar por nombre
router.get("/nombre/{nombre}", async (req, res) => {
    const { nombre } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ?", [nombre]);
    res.send(proyectos);
});

//Filtra por propietario
router.get("/propietario/{propietario}", async (req, res) => {
    const { propietario } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE propietario = ?", [propietario]);
    res.send(proyectos);
});

//Filtra por estatus
router.get("/estatus/{estatus}", async (req, res) => {
    const { estatus } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE estatus = ?", [estatus]);
    res.send(proyectos);
});

//Filtrar por descripcion   
router.get("/descripcion/{descripcion}", async (req, res) => {
    const { descripcion } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE descripcion = ?", [descripcion]);
    res.send(proyectos);
});

//Filtrar por nombre y propietario
router.get("/nombre/{nombre}/propietario/{propietario}", async (req, res) => {
    const { nombre, propietario } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND propietario = ?", [nombre, propietario]);
    res.send(proyectos);
});

//Filtrar por nombre y estatus
router.get("/nombre/{nombre}/estatus/{estatus}", async (req, res) => {
    const { nombre, estatus } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND estatus = ?", [nombre, estatus]);
    res.send(proyectos);
});

//Filtrar por prpoietario y estatus
router.get("/propietario/{propietario}/estatus/{estatus}", async (req, res) => {
    const { propietario, estatus } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE propietario = ? AND estatus = ?", [propietario, estatus]);
    res.send(proyectos);
});

//Filtrar por nombre, propietario y estatus
router.get("/nombre/{nombre}/propietario/{propietario}/estatus/{estatus}", async (req, res) => {
    const { nombre, propietario, estatus } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND propietario = ? AND estatus = ?", [nombre, propietario, estatus]);
    res.send(proyectos);
});

//Filtrar por nombre, propietario y descripcion
router.get("/nombre/{nombre}/propietario/{propietario}/descripcion/{descripcion}", async (req, res) => {
    const { nombre, propietario, descripcion } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND propietario = ? AND descripcion = ?", [nombre, propietario, descripcion]);
    res.send(proyectos);
});

//Filtrar por nombre, estatus y descripcion
router.get("/nombre/{nombre}/estatus/{estatus}/descripcion/{descripcion}", async (req, res) => {
    const { nombre, estatus, descripcion } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND estatus = ? AND descripcion = ?", [nombre, estatus, descripcion]);
    res.send(proyectos);
});

//Filtrar por propietario, estatus y descripcion
router.get("/propietario/{propietario}/estatus/{estatus}/descripcion/{descripcion}", async (req, res) => {
    const { propietario, estatus, descripcion } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE propietario = ? AND estatus = ? AND descripcion = ?", [propietario, estatus, descripcion]);
    res.send(proyectos);
});

//Filtrar por nombre, propietario, estatus y descripcion
router.get("/nombre/{nombre}/propietario/{propietario}/estatus/{estatus}/descripcion/{descripcion}", async (req, res) => {
    const { nombre, propietario, estatus, descripcion } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE nombre = ? AND propietario = ? AND estatus = ? AND descripcion = ?", [nombre, propietario, estatus, descripcion]);
    res.send(proyectos);
});




router.post("/", async (req, res) => {
    const { nombre, propietario, estatus, descripcion} = req.body;
    const newProyecto = {
        nombre, propietario, estatus, descripcion
    };
    await pool.query("INSERT INTO proyecto set ?", [newProyecto]);
    res.send(req.body);
});



router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const proyectos = await pool.query("SELECT * FROM proyecto WHERE id = ?", [id]);
    res.send(proyectos);
});

router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, estatus, propietario} = req.body;
    const newProceso = {
        nombre, descripcion, estatus, propietario
    };
    await pool.query("UPDATE proyecto set ? WHERE id = ?", [newProceso, id]);
    res.send(req.body);
});


router.get("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM proyecto WHERE id = ?", [id]);
    res.send("Proyecto eliminado");
});


module.exports = router;
const express = require("express");
const morgan = require("morgan");
const path = require("path");


const app = express();

app.set("port", process.env.PORT || 3000);

//Middleware
app.use(morgan("dev"));

//Global variables



//Routes
app.use(require("./routes/index"));
app.use("/procesos",require("./routes/procesos"));
app.use("/empresa",require("./routes/empresa"));
app.use("/plantilla",require("./routes/plantilla"));
app.use("/evidencias",require("./routes/evidencias"));
app.use("roles",require("./routes/roles"));
app.use("/fases",require("./routes/fases"));
app.use("/proyectos",require("./routes/proyectos"));




//Public
app.use(express.static(path.join(__dirname + "public")));



// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
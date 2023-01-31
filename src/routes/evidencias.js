const express = require("express");
const multer = require("multer");
const router = express.Router();
const mimeTypes = require("mime-types")

const storage = multer.diskStorage({
    destination: './../archivos/', 
    filename: function(req, file, cb){
        cb("",Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype));
    }
})
const upload = multer({
    storage: storage
})

router.get("/", (req, res) => {
    res.sendFile('index.html', {root: './views/'})
})

router.post("/files", upload.single("avatar"), (req, res) => {
    res.send('Todo bien :)')
})

module.exports = router;
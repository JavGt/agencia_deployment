// Importamos express
// const express = require("express");
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

// Contiene una funciones para ejecutar express
const app = express();

// Conectar la base de datos
db.authenticate()
	.then(() => console.log("Base de datos conectada"))
	.catch((error) => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || "0.0.0.0";

// Se indica el motor del plantillas a utilizar
app.set("view engine", "pug");

// Obtener el año actual
app.use((req, res, next) => {
	const year = new Date();
	res.locals.actualYear = year.getFullYear();
	res.locals.nombreSitio = "Agencia de Viajes";

	next();
});

// Agregar body parser para leer los datos del formulario "POST"
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static("public"));

// Agregar router
app.use("/", router);

// Arranca el servidor
app.listen(port, host, () => {
	console.log(`El servidor esta funcionado en la url ${host}:${port}`);
});

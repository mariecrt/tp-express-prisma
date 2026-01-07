// import express from "express";
// import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./swagger.js";
// import booksRouter from "./routes/books.routes.js";

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./swagger");
const booksRouter = require("./routes/books.routes");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

module.exports = app;
import express from "express";
import superheroesRoutes from "./6-routes/superheroesRoutes";

const server = express();

server.use("/", superheroesRoutes);

server.listen(4000, ()=> console.log("Listening on http://localhpost:4000"));
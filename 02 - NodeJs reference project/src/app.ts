import express from "express";
import catchAll from "./3-middleware/catch-all";
import consoleLogger from "./3-middleware/console-logger";
import fileLogger from "./3-middleware/file-logger";
import routeNotFound from "./3-middleware/router-not-found";
import sabbatForbidden from "./3-middleware/sabbat-forbidden";
import superheroesRoutes from "./6-routes/superheroes-routes";

// Create one server:
const server = express();

// Register middleware for all routes: 
server.use(sabbatForbidden);
server.use(consoleLogger);
server.use(fileLogger);

// Build request.body from given JSON:
server.use(express.json());

// Combine superheroes routes into our server:
server.use("/", superheroesRoutes);

// Route not found middleware:
server.use("*", routeNotFound);

// Register catch-all middleware:
server.use(catchAll);

// Run server: 
server.listen(4000, () => console.log("Listening on http://localhost:4000"));

import express, { NextFunction, Request, Response } from "express";
import SuperheroModel from "../2-models/superhero-model";
import consoleLogger from "../3-middleware/console-logger";
import superheroesService from "../5-services/superheroes-service";

// Create superheroes router:
const router = express.Router(); // Capital R

// GET http://localhost:4000/api/superheroes

// router.get("/api/superheroes", consoleLogger , async (request: Request, response: Response) => {
router.get("/api/superheroes", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Get all superheroes:
        const superheroes = await superheroesService.getAllSuperheroes();

        // Response back:
        response.json(superheroes);

    }
    catch (err: any) {
        next(err);
    }

});

// GET http://localhost:4000/api/superheroes/:id
router.get("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {

        console.log("Testing...................");
        

        // Extract id from route:
        const id = +request.params.id;

        // Get that superhero:
        const superhero = await superheroesService.getOneSuperhero(id);

        // Response back:
        response.json(superhero);

    }
    catch (err: any) {
        next(err);
    }

});

// POST http://localhost:4000/api/superheroes
router.post("/api/superheroes", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Get superhero from body:
        const superhero = new SuperheroModel(request.body); // Literal Object

        // Add it to database:
        const addedSuperhero = await superheroesService.addSuperhero(superhero);

        // Response back:
        response.status(201).json(addedSuperhero);

    }
    catch (err: any) {
        next(err);
    }

});

// PUT http://localhost:4000/api/superheroes/:id
router.put("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Take route id into the body:
        request.body.id = +request.params.id;

        // Get superhero from body:
        const superhero = new SuperheroModel(request.body);

        // Update it in database:
        const updatedSuperhero = await superheroesService.updateFullSuperhero(superhero);

        // Response back:
        response.json(updatedSuperhero);

    }
    catch (err: any) {
        next(err);
    }

});

// PATCH http://localhost:4000/api/superheroes/:id
router.patch("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Take route id into the body:
        request.body.id = +request.params.id;

        // Get superhero from body:
        const superhero = new SuperheroModel(request.body);

        // Update it in database:
        const updatedSuperhero = await superheroesService.updatePartialSuperhero(superhero);

        // Response back:
        response.json(updatedSuperhero);

    }
    catch (err: any) {
        next(err);
    }

});

// DELETE http://localhost:4000/api/superheroes/:id
router.delete("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Take route id:
        const id = +request.params.id;

        // Delete that item:
        await superheroesService.deleteSuperhero(id);

        // Response back:
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }

});

export default router;

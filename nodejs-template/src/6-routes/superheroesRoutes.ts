import express, { Request, Response } from "express"
import superheroesService from "../5-services/superheroesService";

const router = express.Router();

// GET on http://localhost:4000/api/superheroes
router.get("/api/superheroes", async (request: Request, response: Response) =>{

    const superheroes = await superheroesService.getAllSuperheroes();

    response.json(superheroes);

});

export default router;
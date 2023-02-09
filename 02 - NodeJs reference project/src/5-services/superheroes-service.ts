import { ResourceNotFoundError } from "../2-models/client-errors";
import SuperheroModel from "../2-models/superhero-model";
import dal from "../4-utils/dal";

// Get all superheroes:
async function getAllSuperheroes(): Promise<SuperheroModel[]> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Return:
    return superheroes;
}

// Get one superhero:
async function getOneSuperhero(id: number): Promise<SuperheroModel> {

    // Get all superheroes from file (in real database we're get only needed one):
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find needed superhero:
    const superhero = superheroes.find(h => h.id === id); // Returns undefined if not found.

    // If resource not found:
    if (!superhero) {
        throw new ResourceNotFoundError(id);
    }

    // Return:
    return superhero;
}

// Add new superhero:
async function addSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Validation:
    superhero.validatePost();

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Create new id for the given object (database will do it automatically):
    superhero.id = superheroes[superheroes.length - 1].id + 1;

    // Add object to array:
    superheroes.push(superhero);

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);

    // Return added object:
    return superhero;
}

// Update full superhero:
async function updateFullSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Validation:
    superhero.validatePut();

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find index of the object to update:
    const index = superheroes.findIndex(h => h.id === superhero.id);

    // If resource not found:
    if (index === -1) {
        throw new ResourceNotFoundError(superhero.id);
    }

    // Update that object:
    superheroes[index] = superhero;

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);

    // Return updated object:
    return superhero;
}

// Update partial superhero:
async function updatePartialSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Validation:
    superhero.validatePatch();

    // Get desired object from database: 
    const dbSuperhero = await getOneSuperhero(superhero.id);

    // Change only given fields:
    for (const prop in dbSuperhero) {
        if (superhero[prop] !== undefined) {
            dbSuperhero[prop] = superhero[prop];
        }
    }

    // Update back to database:
    await updateFullSuperhero(dbSuperhero);

    // Return updated object:
    return dbSuperhero;
}

// Delete existing superhero:
async function deleteSuperhero(id: number): Promise<void> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find index of the object to update:
    const index = superheroes.findIndex(h => h.id === id);

    // If resource not found:
    if (index === -1) {
        throw new ResourceNotFoundError(id);
    }

    // Delete that object:
    superheroes.splice(index, 1);

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);
}

export default {
    getAllSuperheroes,
    getOneSuperhero,
    addSuperhero,
    updateFullSuperhero,
    updatePartialSuperhero,
    deleteSuperhero
};

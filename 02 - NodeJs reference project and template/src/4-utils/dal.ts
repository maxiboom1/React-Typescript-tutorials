import fsPromises from "fs/promises";
import SuperheroModel from "../2-models/superhero-model";

// File location:
const superheroesFile = "./src/1-assets/data/superheroes.json";

// Get all superheroes from file:
async function getAllSuperheroesFromFile(): Promise<SuperheroModel[]> {

    // Read file content as a JSON string:
    const content = await fsPromises.readFile(superheroesFile, "utf-8");

    // Convert JSON string to array:
    const superheroes = JSON.parse(content);

    // Return:
    return superheroes;
}

// Save all superheroes to file:
async function saveAllSuperheroesToFile(superheroes: SuperheroModel[]): Promise<void> {

    // Create JSON string from array:
    const content = JSON.stringify(superheroes, null, 4);

    // Save content to JSON file:
    await fsPromises.writeFile(superheroesFile, content);
}

export default {
    getAllSuperheroesFromFile,
    saveAllSuperheroesToFile
};



import SuperheroModel from "../2-models/superhero-model";
import fsPromises from "fs/promises";

const superheroesFile = "./src/1-assets/data/superheroes.json";



async function getAllSuperheroesFromFile():Promise<SuperheroModel[]>{

    try{
        const dataFromDb =  await fsPromises.readFile(superheroesFile, "utf-8");

        const superheroes = JSON.parse(dataFromDb);
    
        return superheroes;
    
    }catch(err:any){
        
        console.log(err);

    }

}

export default {
    getAllSuperheroesFromFile
}
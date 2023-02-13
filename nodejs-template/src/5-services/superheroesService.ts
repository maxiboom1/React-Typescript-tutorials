import SuperheroModel from "../2-models/superhero-model";
import dal from "../4-utils/dal";


async function getAllSuperheroes():Promise<SuperheroModel[]>{

    const superheroes = await dal.getAllSuperheroesFromFile();

    return superheroes;

}

export default{
    getAllSuperheroes
}
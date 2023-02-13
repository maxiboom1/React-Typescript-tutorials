class SuperheroModel{
    public id: number;
    public name: string;
    public ability: string;

    public constructor (superhero: SuperheroModel){ // Copy constructor
        this.id = superhero.id;
        this.name = superhero.name;
        this.ability = superhero.ability;
    }
}

export default SuperheroModel;


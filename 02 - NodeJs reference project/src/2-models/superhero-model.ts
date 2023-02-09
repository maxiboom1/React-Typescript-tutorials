import { ValidationError } from "./client-errors";
import Joi from "joi";

class SuperheroModel {

    public id: number;
    public name: string;
    public ability: string;

    public constructor(superhero: SuperheroModel) { // Copy Constructor
        this.id = superhero.id;
        this.name = superhero.name;
        this.ability = superhero.ability;
    }

    private static postValidationSchema = Joi.object({
        id: Joi.number().forbidden().positive().integer(),
        name: Joi.string().required().min(3).max(100),
        ability: Joi.string().required().min(10).max(1000)
    });

    private static putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        name: Joi.string().required().min(3).max(100),
        ability: Joi.string().required().min(10).max(1000)
    });

    private static patchValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        name: Joi.string().optional().min(3).max(100),
        ability: Joi.string().optional().min(10).max(1000)
    });

    public validatePost(): void {
        const result = SuperheroModel.postValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    public validatePut(): void {
        const result = SuperheroModel.putValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

    public validatePatch(): void {
        const result = SuperheroModel.patchValidationSchema.validate(this);
        if(result.error) throw new ValidationError(result.error.message);
    }

}

export default SuperheroModel;

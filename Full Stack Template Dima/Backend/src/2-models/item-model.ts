import { ValidationError } from "./client-errors";
import Joi from "joi";

class ItemModel {
  itemId: number;
  categoryId: number;
  name: string;
  something: string;

  public constructor(item: ItemModel) {
    this.itemId = item.itemId;
    this.categoryId = item.categoryId;
    this.name = item.name;
    this.something = item.something;
  }

  private static postValidationSchema = Joi.object({
    itemId: Joi.number().forbidden().positive().integer(),
    categoryId: Joi.number().positive().integer().required(),
    name: Joi.string().required().min().max(),
    something: Joi.string().required().min().max(),
  });

  private static putValidationSchema = Joi.object({
    itemId: Joi.number().required().positive().integer(),
    categoryId: Joi.number().positive().integer().required(),
    name: Joi.string().required().min().max(),
    something: Joi.string().required().min().max(),
  });

  public validatePost(): void {
    const result = ItemModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validatePut(): void {
    const result = ItemModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default ItemModel;

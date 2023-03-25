import express, { Request, Response, NextFunction } from "express";
import ItemModel from "../2-models/item-model";
import dataService from "../5-services/data-service";

const router = express.Router();

router.get(
  "/categories",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categories = await dataService.getAllCategories();
      response.json(categories);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/items-per-categories/:categoryId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categoryId = +request.params.categoryId;
      const items = await dataService.getItemsByCategory(categoryId);
      response.json(items);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/items",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = new ItemModel(request.body);
      const addedItem = await dataService.addItem(item);
      response.status(201).json(addedItem);
    } catch (err: any) {
      next(err);
    }
  }
);
router.delete(
  "/items/:itemId([0-9]+)",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const itemId = +request.params.itemId;
      await dataService.deleteItem(itemId);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put("/items/:itemId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
  try {
      request.body.itemId = +request.params.itemId;
      const item = new ItemModel(request.body);
      const updatedItem = await dataService.updateItem(item);
      response.json(updatedItem);
  }
  catch (err: any) {
      next(err);
  }
});

router.get("/items/:itemId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
  try {
      const itemId = +request.params.itemId;
      const item = await dataService.getOneItem(itemId);
      response.json(item);
  }
  catch (err: any) {
      next(err);
  }
});


export default router;

import { Request, Response } from "express";
import { CategoryService } from "./category.services";

const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await CategoryService.createCategory(data);
    res.send({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = {
  createCategory,
};

import { Router } from "express";
import { findAll, findById, addCategory, updateCategory, deleteCategory } from "../controllers/category.controllers.js";

const router = Router();
router.get("/category/get", findAll);
router.get("/category/get/:id", findById);
router.post("/category/create", addCategory);
router.put("/category/update/:id", updateCategory);
router.delete("/category/delete/:id", deleteCategory);

export default router;
import { Router } from "express";
import { findAll, findById, findByCategory, addProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

const router = Router();
router.get("/product/get", findAll);
router.get("/product/get/:id", findById);
router.get("/product/category/:id", findByCategory);
router.post("/product/create", addProduct);
router.put("/product/update/:id", updateProduct);
router.delete("/product/delete/:id", deleteProduct);

export default router;
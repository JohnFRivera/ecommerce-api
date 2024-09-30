import { Router } from "express";
import { findAll, findById, register, authenticate, updateAddress } from "../controllers/user.controllers.js";

const router = Router();
router.get("/user/get", findAll);
router.get("/user/get/:id", findById);
router.post("/user/register", register);
router.post("/user/auth", authenticate);
router.put("/user/update/:id", updateAddress);

export default router;
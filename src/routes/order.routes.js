import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderControllers.js";

const router = Router();
router.get('/order/get',getOrders);
router.get('/order/get/id',getOrderById);
router.post('/order/create', createOrder);
router.put('/order/update/:id', updateOrder);
router.delete('/order/delete/:id',deleteOrder);

export default router;

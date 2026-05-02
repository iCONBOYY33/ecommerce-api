import { Router } from "express";
import { OrderController } from "./order.controller.js";

const router = Router();

router.post("/", OrderController.create);

export default router;
